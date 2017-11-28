import { expect } from 'chai'
import { useFakeXMLHttpRequest, spy } from 'sinon'
import { shallow } from 'vue-test-utils'

import App from './app.vue'

import { API_NPB_LEAGUES, API_NPB_TEAMS, API_NUMBER_OF_VISITORS_HISTORY, API_PENNANT_RACE_HISTORY } from '../../api/endpoints'

describe('App.vue', () => {
  let wrapper
  let xhr
  let requests

  beforeEach(() => {
    wrapper = shallow(App)
  })

  before(() => {
    xhr = useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = (req) => {
      requests.push(req)
    }
  })

  after(() => {
    xhr.restore()
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

  it('should request data', () => {
    expect(requests[0].url).to.equal(API_NPB_LEAGUES)
    expect(requests[1].url).to.equal(API_NPB_TEAMS)
    expect(requests[2].url).to.equal(API_NUMBER_OF_VISITORS_HISTORY)
    expect(requests[3].url).to.equal(API_PENNANT_RACE_HISTORY)
  })
})
