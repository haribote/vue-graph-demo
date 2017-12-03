import Vue from 'vue'
import range from 'lodash.range'
import round from 'lodash.round'
import ceil from 'lodash.ceil'
import floor from 'lodash.floor'

import getDigits from '../../core/get-digits'

const Y_AXIS_LINES_LENGTH = 5

export default Vue.extend({
  name: 'ChartLine',

  props: {
    svgWidth: {
      type: Number,
      default: 1140
    },
    svgHeight: {
      type: Number,
      default: 640
    },
    paddingLeft: {
      type: Number,
      default: 60
    },
    paddingRight: {
      type: Number,
      default: 30
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
    }
  },

  computed: {
    viewBox (): string {
      return `${0} ${0} ${this.svgWidth} ${this.svgHeight}`
    },
    allValues (): number[] {
      return this.series
        .reduce((memo, data) => {
          return memo.concat(data)
        }, [])
    },
    _maxValue (): number {
      return Math.max(...this.allValues)
    },
    _minValue (): number {
      return Math.min(...this.allValues)
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
    percentOfSeries (): number[][] {
      return this.series
        .map(data => data
          .map(value => (value - this.minValue) / this.valueReminder)
        )
    },
    yAxisLinePropsList (): { y: number, d: string, transform: string }[] {
      const d = `M${0},${.5} H${this.svgWidth}`
      return range(0, this.svgHeight, this.svgHeight / (Y_AXIS_LINES_LENGTH - 1))
        .concat([this.svgHeight - 1])
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
      return [.5, 1]
        .map(value => ({
          value: this.maxValue * value,
          transform: `translate(0, ${round(this.svgHeight * value * -1, 2)})`
        }))
    },
    yAxisLabelTransform (): string {
      return `translate(0 ${this.svgHeight})`
    },
    chartWidth (): number {
      return this.svgWidth - (this.paddingLeft + this.paddingRight)
    },
    xAxisStep (): number {
      return this.chartWidth / Math.max(...this.series.map(data => data.length - 1))
    },
    seriesLineTransform (): string {
      return `translate(${this.paddingLeft} ${this.svgHeight})`
    },
    seriesLinePointList (): number[][][] {
      return this.percentOfSeries
        .map(data => data
          .map((value, index) => [
            round(this.xAxisStep * index, 2),
            round(this.svgHeight * value * -1, 2)
          ]))
    },
    seriesLinePropsList (): { isVisible: boolean, color: string, points: string }[] {
      return this.seriesLinePointList
        .map((points, i) => {
          const { color, isVisible } = this.lines[i]

          return {
            isVisible,
            color,
            points: points.map(p => p.join(' ')).join(' ')
          }
        })
    },
    seriesDotPropsList (): { transform: string }[][] {
      return this.seriesLinePointList
        .map((points, i) => {
          return points
            .map(p => {
              const [x, y] = p
              return {
                transform: `translate(${x} ${y})`
              }
            })
        })
    }
  }
})
