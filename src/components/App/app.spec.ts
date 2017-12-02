import { expect } from 'chai'
import { fakeServer, SinonFakeServer } from 'sinon'
import { shallow } from 'vue-test-utils'

import App from './app.vue'

import { API_NPB_LEAGUES, API_NPB_TEAMS, API_NUMBER_OF_VISITORS_HISTORY, API_PENNANT_RACE_HISTORY } from '../../api/endpoints'
import * as MOCK_NPB_LEAGUES from '../../../static/npb-leagues.json'
import * as MOCK_NPB_TEAMS from '../../../static/npb-teams.json'
import * as MOCK_NUMBER_OF_VISITORS_HISTORY from '../../../static/npb-number-of-visitors-history.json'
import * as MOCK_PENNANT_RACE_HISTORY from '../../../static/npb-pennant-race-history.json'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'

const RESPONSE = {
  [API_NPB_LEAGUES]: MOCK_NPB_LEAGUES,
  [API_NPB_TEAMS]: MOCK_NPB_TEAMS,
  [API_NUMBER_OF_VISITORS_HISTORY]: MOCK_NUMBER_OF_VISITORS_HISTORY,
  [API_PENNANT_RACE_HISTORY]: MOCK_PENNANT_RACE_HISTORY
}

describe('App.vue', () => {
  let wrapper
  let server: SinonFakeServer

  beforeEach(() => {
    wrapper = shallow(App)
  })

  before(() => {
    server = fakeServer.create()
    Object.keys(RESPONSE)
      .map(url => server.respondWith(url, JSON.stringify(RESPONSE[url])))
    server.respondImmediately = true
  })

  after(() => {
    server.restore()
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

  it('should sync data', (done) => {
    setTimeout(() => {

      expect(wrapper.vm.leagues)
        .to.deep.equal(MOCK_NPB_LEAGUES['leagues'])

      expect(wrapper.vm.teams)
        .to.deep.equal(MOCK_NPB_TEAMS['teams'])

      expect(wrapper.vm.numberOfVisitorsHistory)
        .to.deep.equal(MOCK_NUMBER_OF_VISITORS_HISTORY['seasons'])

      expect(wrapper.vm.pennantRaceHistory)
        .to.deep.equal(MOCK_PENNANT_RACE_HISTORY['seasons'])

      expect(wrapper.vm.lineChartTabLabels)
        .to.deep.equal(MOCK_NPB_LEAGUES['leagues'].map(l => l.name))

      expect(wrapper.vm.lineChartHistoryList)
        .to.deep.equal(
          transformNumberOfVisitorsHistory(MOCK_NUMBER_OF_VISITORS_HISTORY['seasons'], MOCK_NPB_TEAMS['teams'])
        )

      done()
    }, 1)
  })
})
