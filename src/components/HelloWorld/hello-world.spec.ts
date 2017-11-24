import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import HelloWorld from './hello-world.vue'

describe('HelloWorld.vue', () => {
  it('should render default message', () => {
    const wrapper = shallow(HelloWorld)
    expect(wrapper.find('.hello h1').text())
      .to
      .equal('Welcome to Your Vue.js App')
  })
})
