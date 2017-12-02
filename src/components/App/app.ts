import Vue from 'vue'
import 'core-js/fn/promise'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

import TabList from '../TabList/tab-list.vue'

interface AppDataInterface {
  leagues: NpbLeagueInterface[],
  teams: NpbTeamInterface[],
  numberOfVisitorsHistory: NpbSeasonInterface[],
  pennantRaceHistory: NpbSeasonInterface[],
  lineChartCurrentLeague: number
}

export default Vue.extend({
  name: 'app',

  components: {
    TabList
  },

  data (): AppDataInterface {
    return {
      leagues: [],
      teams: [],
      numberOfVisitorsHistory: [],
      pennantRaceHistory: [],
      lineChartCurrentLeague: 0
    }
  },

  computed: {
    lineChartTabLabels (): string[] {
      return this.leagues
        .map(l => l.name)
    },
    lineChartHistoryList (): any[] {
      return this.numberOfVisitorsHistory
        .map(h => h.data)
        .reduce((memo, data) => {
          data.forEach(d => memo[d.team] = [d.value].concat(memo[d.team]))
          return memo
        }, this.teams.map(() => []))
    }
  },

  methods: {
    fetchAll (): Promise<[NpbLeagueInterface[], NpbTeamInterface[], NpbSeasonInterface[], NpbSeasonInterface[]]> {
      return Promise.all([
        fetchNpbLeagues(),
        fetchNpbTeams(),
        fetchNpbNumberOfVisitorsHistory(),
        fetchNpbPennantRaceHistory()
      ])
    },

    handleClickLineChartTabItem (index: number) {
      this.lineChartCurrentLeague = index
    }
  },

  created () {
    this.fetchAll()
      .then(resps => {
        const [leagues, teams, numberOfVisitorsHistory, pennantRaceHistory] = resps

        Object.assign(this, {
          leagues,
          teams,
          numberOfVisitorsHistory,
          pennantRaceHistory
        })
      })
      .catch(err => console.error(err.message))
  }
})
