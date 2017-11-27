import { expect } from 'chai'
import { shallow } from 'vue-test-utils'

import App from './app.vue'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(App)
  })

  it('should render app wrapper', () => {
    /* tslint:disable-next-line:no-unused-expression */
    expect(wrapper.is('#app'))
      .to.be.true
  })

  it('should render 5 `.container` elements', () => {
    const containerElList = wrapper.findAll('.container')

    expect(containerElList.length).to.equal(5)

    /* tslint:disable-next-line:no-unused-expression */
    expect(containerElList.at(0).is('header'))
      .to.be.true

    expect(containerElList.at(1).find('h2').text())
      .to.equal('Line chart')

    expect(containerElList.at(2).find('h2').text())
      .to.equal('Bar chart')

    expect(containerElList.at(3).find('h2').text())
      .to.equal('Pie chart')

    /* tslint:disable-next-line:no-unused-expression */
    expect(containerElList.at(4).is('footer'))
      .to.be.true
  })
})
