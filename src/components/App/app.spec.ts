import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import App from './app.vue'

describe('App.vue', () => {
  it('should render app wrapper', () => {
    const wrapper = shallow(App)
    expect(wrapper.vm.$el.id).to.equal('app')
  })
})
