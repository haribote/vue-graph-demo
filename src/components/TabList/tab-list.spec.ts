import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import TabList from './tab-list.vue'

describe('TabList.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(TabList, {
      propsData: {
        labels: ['foo', 'bar']
      }
    })
  })

  it('should render `.tab-list` element on root', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('.tab-list'))
      .to.be.true
  })
})
