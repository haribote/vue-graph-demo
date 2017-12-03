import { expect } from 'chai'
import { shallow } from 'vue-test-utils'
import ceil from 'lodash.ceil'
import floor from 'lodash.floor'

import ChartLine from './chart-line.vue'
import * as MOCK_NPB_TEAMS from '../../../static/npb-teams.json'
import * as MOCK_NUMBER_OF_VISITORS_HISTORY from '../../../static/npb-number-of-visitors-history.json'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'
import getDigits from '../../core/get-digits'

const mockSeries = transformNumberOfVisitorsHistory(MOCK_NUMBER_OF_VISITORS_HISTORY['seasons'], MOCK_NPB_TEAMS['teams'])
const mockLines = [{ 'id': 0,'name': 'Marines','color': '#000000','isVisible': true },{ 'id': 1,'name': 'Dragons','color': '#003595','isVisible': false },{ 'id': 2,'name': 'Hawks','color': '#FBC700','isVisible': true },{ 'id': 3,'name': 'Tigers','color': '#FFE100','isVisible': false },{ 'id': 4,'name': 'Carp','color': '#E50012','isVisible': false },{ 'id': 5,'name': 'Fighters','color': '#00508F','isVisible': true },{ 'id': 6,'name': 'Buffaloes','color': '#9E751E','isVisible': true },{ 'id': 7,'name': 'Lions','color': '#0079c2','isVisible': true },{ 'id': 8,'name': 'Golden Eagles','color': '#870010','isVisible': true },{ 'id': 9,'name': 'Swallows','color': '#96c800','isVisible': false },{ 'id': 10,'name': 'BayStars','color': '#0052CD','isVisible': false },{ 'id': 11,'name': 'Giants','color': '#FF7820','isVisible': false }]
const mockXAxisLabels = [2013,2014,2015,2016,2017]
const mockAllValues = [1260439, 1223915, 1322004, 1526932, 1450164, 1998188, 2000912, 2049784, 2058381, 2010772, 2408993, 2468442, 2535877, 2492983, 2526792, 2771603, 2689593, 2878352, 2910562, 3034626, 1565598, 1904781, 2110266, 2157331, 2177554, 1855655, 1897789, 1959943, 2078981, 2086410, 1438467, 1703734, 1767220, 1794475, 1608751, 1600841, 1498365, 1616827, 1618194, 1673219, 1281087, 1450233, 1524149, 1620961, 1770108, 1432695, 1438775, 1657511, 1779460, 1862731, 1425728, 1564528, 1813800, 1939146, 1979446, 3008197, 3018284, 3001187, 3004108, 2958890]
const mockYAxisLinePropsList = [
  {
    y: 0,
    d: 'M0,0.5 H1140',
    transform: 'translate(0, 0)'
  },
  {
    y: 128,
    d: 'M0,0.5 H1140',
    transform: 'translate(0, 128)'
  },
  {
    y: 256,
    d: 'M0,0.5 H1140',
    transform: 'translate(0, 256)'
  },
  {
    y: 384,
    d: 'M0,0.5 H1140',
    transform: 'translate(0, 384)'
  },
  {
    y: 512,
    d: 'M0,0.5 H1140',
    transform: 'translate(0, 512)'
  },
  {
    y: 640,
    d: 'M0,0.5 H1140',
    transform: 'translate(0, 639)'
  }
]

describe('ChartLine', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(ChartLine, {
      propsData: {
        series: mockSeries,
        lines : mockLines,
        xAxisLabels: mockXAxisLabels
      }
    })
  })

  it('should render `.chart-line` element on root', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('.chart-line'))
      .to.be.true
  })

  it('should render svg element', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.find('svg').hasAttribute('viewBox', '0 0 1140 640'))
      .to.be.true
  })

  it('should concat from all values of `series` to `allValues`', () => {
    expect(wrapper.vm.allValues)
      .to.deep.equal(mockAllValues)
  })

  it('should return correct `maxValue`', () => {
    expect(wrapper.vm.maxValue)
      .to.equal(ceil(wrapper.vm._maxValue, (getDigits(wrapper.vm._maxValue) - 2) * -1))
  })

  it('should return correct `minValue`', () => {
    expect(wrapper.vm.minValue)
      .to.equal(floor(wrapper.vm.minValue._minValue, (getDigits(wrapper.vm.minValue._minValue) - 2) * -1))
  })

  it('should return correct `valueReminder`', () => {
    expect(wrapper.vm.valueReminder)
      .to.equal(wrapper.vm.maxValue - wrapper.vm.minValue)
  })

  it('should return correct `yAxisLinePropsList`', () => {
    expect(wrapper.vm.yAxisLinePropsList)
      .to.deep.equal(mockYAxisLinePropsList)
  })

  it('should return correct `chartWidth`', () => {
    expect(wrapper.vm.chartWidth)
      .to.equal(wrapper.vm.svgWidth - (wrapper.vm.paddingLeft + wrapper.vm.paddingRight))
  })

  it('should return correct `xAxisStep`', () => {
    expect(wrapper.vm.xAxisStep)
      .to.equal(wrapper.vm.chartWidth / Math.max(...wrapper.vm.series.map(data => data.length)))
  })

  it('should return correct `seriesLineTransform`', () => {
    expect(wrapper.vm.seriesLineTransform)
      .to.equal(`translate(${wrapper.vm.paddingLeft} ${wrapper.vm.svgHeight})`)
  })

  it('should return correct `seriesLinePointList`', () => {
    expect(wrapper.vm.seriesLinePointList.length)
      .to.equal(12)
  })

  it('should return correct `seriesLinePropsList`', () => {
    expect(wrapper.vm.seriesLinePropsList.length)
      .to.equal(12)
  })

  it('should return correct `seriesDotPropsList`', () => {
    expect(wrapper.vm.seriesLinePropsList.length)
      .to.equal(12)
  })
})
