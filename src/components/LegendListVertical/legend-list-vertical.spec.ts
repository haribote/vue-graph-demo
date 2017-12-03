import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import LegendListVertical from './legend-list-vertical.vue'

describe('LegendListVertical', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(LegendListVertical)
  })

  it('should render `.legend-list` element on root', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('.legend-list'))
      .to.be.true
  })
})
