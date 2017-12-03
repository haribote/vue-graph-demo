import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import LegendList from './legend-list.vue'

describe('LegendList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(LegendList)
  })

  it('should render `.legend-list` element on root', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('.legend-list'))
      .to.be.true
  })
})
