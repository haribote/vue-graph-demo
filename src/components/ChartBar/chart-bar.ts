import Vue from 'vue'
import ceil from 'lodash.ceil'
import round from 'lodash.round'
import range from 'lodash.range'
import floor from 'lodash.floor'

import getDigits from '../../core/get-digits'

const Y_AXIS_LINES_LENGTH = 5

export default Vue.extend({
  name: 'ChartBar',

  props: {
    svgWidth: {
      type: Number,
      default: 1140
    },
    svgHeight: {
      type: Number,
      default: 640
    },
    paddingBottom: {
      type: Number,
      default: 24
    },
    paddingLeft: {
      type: Number,
      default: 120
    },
    paddingRight: {
      type: Number,
      default: 90
    },
    series: {
      type: Array,
      required: true
    },
    lines: {
      type: Array,
      default () {
        return []
      }
    },
    yAxisUnit: {
      type: String,
      default: ''
    }
  },

  computed: {
    viewBox (): string {
      return `${0} ${0} ${this.svgWidth} ${this.svgHeight}`
    },
    chartHeight (): number {
      return this.svgHeight - this.paddingBottom
    },
    visibleLines (): { id: number, name: string, color: string, isVisible: boolean }[] {
      return this.lines
        .filter(line => line.isVisible)
    },
    visibleSeries (): number[] {
      if (this.lines.length < 1) {
        return this.series
      }
      return this.visibleLines
        .map(line => this.series[line.id])
    },
    _maxValue (): number {
      return Math.max(...this.series)
    },
    _minValue (): number {
      return Math.min(...this.series)
    },
    maxValue (): number {
      return ceil(this._maxValue, (getDigits(this._maxValue) - 2) * -1)
    },
    minValue (): number {
      return floor(this._minValue, (getDigits(this._minValue) - 2) * -1)
    },
    valueReminder (): number {
      return this.maxValue - this.minValue
    },
    percentOfSeries (): number[] {
      return this.visibleSeries
        .map(value => (value - this.minValue) / this.valueReminder)
    },
    yAxisLinePropsList (): { y: number, d: string, transform: string }[] {
      const d = `M${0},${.5} H${this.svgWidth}`
      return range(0, this.chartHeight, this.chartHeight / (Y_AXIS_LINES_LENGTH - 1))
        .concat([this.chartHeight])
        .map(y => {
          const _y = round(y, 2)
          return {
            y: _y,
            d,
            transform: `translate(0, ${_y})`
          }
        })
    },
    yAxisLabelPropsList (): any[] {
      return [0, .5, 1]
        .map(value => ({
          value: this.minValue + this.valueReminder * value,
          transform: `translate(0, ${round(this.chartHeight * value * -1, 2)})`
        }))
    },
    yAxisLabelTransform (): string {
      return `translate(0 ${this.chartHeight})`
    },
    chartWidth (): number {
      return this.svgWidth - (this.paddingLeft + this.paddingRight)
    },
    xAxisStep (): number {
      return this.chartWidth / (this.visibleSeries.length - 1)
    },
    seriesLineTransform (): string {
      return `translate(${this.paddingLeft} ${this.chartHeight})`
    },
    seriesLinePointList (): number[][] {
      return this.percentOfSeries
        .map((value, index) => [
          round(this.xAxisStep * index, 2),
          round(this.chartHeight * value * -1, 2)
        ])
    },
    seriesLinePropsList (): { color: string, points?: string }[] {
      return this.seriesLinePointList
        .map((points, i) => {
          const { color } = this.visibleLines[i]
          const [x, h] = points

          return {
            color,
            d: `M${0},${0} V${h}`,
            transform: `translate(${x})`
          }
        })
    },
    xAxisLabelPropsList (): any[] {
      return this.visibleLines
        .map((line, index) => ({
          value: line.name,
          transform: `translate(${round(this.xAxisStep * index, 2)})`
        }))
    }
  }
})
