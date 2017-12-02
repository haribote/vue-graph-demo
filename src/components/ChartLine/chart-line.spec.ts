import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import ChartLine from './chart-line.vue'

describe('ChartLine', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(ChartLine)
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
})
