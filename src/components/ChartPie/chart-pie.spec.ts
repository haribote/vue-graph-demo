import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import ChartPie from './chart-pie.vue'

describe('CartBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(ChartPie, {
      propsData: {
        series: []
      }
    })
  })

  it('should render `.chart-pie` element on root', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('.chart-pie'))
      .to.be.true
  })

})
