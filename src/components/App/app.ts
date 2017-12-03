import Vue from 'vue'
import 'core-js/fn/promise'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

import TabList from '../TabList/tab-list.vue'
import ChartLine from '../ChartLine/chart-line.vue'

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
    TabList,
    ChartLine
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
    lineChartHistoryList (): number[][] {
      return transformNumberOfVisitorsHistory(this.numberOfVisitorsHistory, this.teams, 1000)
    },
    lineChartPropsList (): { id: number, name: string, color: string, isVisible: boolean }[] {
      return this.teams
        .map(t => ({
          id: t.id,
          name: t.name,
          color: t.color,
          isVisible: t.league === this.lineChartCurrentLeague
        }))
    },
    lineChartXAxisLabelList (): number[] {
      return this.numberOfVisitorsHistory
        .map(s => s.season)
        .reverse()
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
