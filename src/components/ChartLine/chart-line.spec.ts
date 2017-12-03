import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import ChartLine from './chart-line.vue'
import * as MOCK_NPB_TEAMS from '../../../static/npb-teams.json'
import * as MOCK_NUMBER_OF_VISITORS_HISTORY from '../../../static/npb-number-of-visitors-history.json'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'

const mockSeries = transformNumberOfVisitorsHistory(MOCK_NUMBER_OF_VISITORS_HISTORY['seasons'], MOCK_NPB_TEAMS['teams'])
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
        series: mockSeries
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
    const _maxValue = Math.max(...mockAllValues)
    expect(wrapper.vm.maxValue)
      .to.equal(Math.ceil(_maxValue + _maxValue * .1))
  })

  it('should return correct `minValue`', () => {
    const _minValue = Math.min(...mockAllValues)
    expect(wrapper.vm.minValue)
      .to.equal(Math.floor(_minValue - _minValue * .1))
  })

  it('should return correct `valueReminder`', () => {
    expect(wrapper.vm.valueReminder)
      .to.equal(wrapper.vm.maxValue - wrapper.vm.minValue)
  })

  it('should return correct `yAxisStep`', () => {
    expect(wrapper.vm.yAxisStep)
      .to.equal(wrapper.vm.svgHeight / wrapper.vm.valueReminder)
  })

  it('should return correct `yAxisLinePropsList`', () => {
    expect(wrapper.vm.yAxisLinePropsList)
      .to.deep.equal(mockYAxisLinePropsList)
  })
})
