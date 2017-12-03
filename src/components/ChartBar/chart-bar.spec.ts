import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import ChartBar from './chart-bar.vue'

describe('CartBar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(ChartBar)
  })

  it('should render `.chart-bar` element on root', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('.chart-bar'))
      .to.be.true
  })

})
