import Vue from 'vue'
import range from 'lodash.range'
import round from 'lodash.round'

const Y_AXIS_LINES_LENGTH = 6

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
      default: 30
    },
    paddingRight: {
      type: Number,
      default: 30
    },
    series: {
      type: Array,
      required: true
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
    maxValue (): number {
      const _maxValue = Math.max(...this.allValues)
      return Math.ceil(_maxValue * 1.1)
    },
    minValue (): number {
      const _minValue = Math.min(...this.allValues)
      return Math.floor(_minValue * .9)
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
    chartWidth (): number {
      return this.svgWidth - (this.paddingLeft + this.paddingRight)
    },
    xAxisStep (): number {
      return this.chartWidth / Math.max(...this.series.map(data => data.length - 1))
    },
    seriesLineTransform (): string {
      return `translate(${this.paddingLeft} ${this.svgHeight})`
    },
    seriesLinePropsList (): { points: string }[] {
      return this.percentOfSeries
        .map(data => ({
          points: data
            .map((value, index) => [
              round(this.xAxisStep * index, 2),
              round(this.svgHeight * value * -1, 2)
            ].join(' '))
            .join(' ')
        }))
    }
  }
})
