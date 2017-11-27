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

  it('should render 2 `li` elements', () => {
    const liElsList = wrapper.findAll('li')

    expect(liElsList.length)
      .to.equal(2)

    /* tslint:disable-next-line:no-unused-expression */
    expect(liElsList.at(0).hasClass('is-current'))
      .to.be.true
  })

  it('should update current item', () => {
    wrapper.vm.handleClickItem(1)
    wrapper.update()

    const liElsList = wrapper.findAll('li')

    /* tslint:disable-next-line:no-unused-expression */
    expect(liElsList.at(1).hasClass('is-current'))
      .to.be.true
  })

  it('should be restricted to a minimum 0', () => {
    wrapper.vm.handleClickItem(-1)

    expect(wrapper.vm.current)
      .to.equal(0)
  })

  it('should be restricted to a maximum labels length', () => {
    wrapper.vm.handleClickItem(10)

    expect(wrapper.vm.current)
      .to.equal(1)
  })

  it('should emit `click-item` event', () => {
    wrapper.vm.handleClickItem(1)

    expect(wrapper.emitted()['click-item'].length)
      .to.equal(1)

    expect(wrapper.emitted()['click-item'][0])
      .to.deep.equal([1])
  })
})
