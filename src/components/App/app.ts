import Vue from 'vue'
import 'core-js/fn/promise'
import 'core-js/fn/array/find'

import transformNumberOfVisitorsHistory from '../../core/transform-number-of-visitors-history'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

import TabList from '../TabList/tab-list.vue'
import ChartLine from '../ChartLine/chart-line.vue'
import ChartBar from '../ChartBar/chart-bar.vue'
import ChartPie from '../ChartPie/chart-pie.vue'

interface AppDataInterface {
  leagues: NpbLeagueInterface[]
  teams: NpbTeamInterface[]
  numberOfVisitorsHistory: NpbSeasonInterface[]
  pennantRaceHistory: NpbSeasonInterface[]
  lineChartCurrentLeague: number
  barChartCurrentLeague: number
  barChartCurrentSeason: number
  pieChartCurrentLeague: number
  pieChartCurrentSeason: number
}

export default Vue.extend({
  name: 'app',

  components: {
    TabList,
    ChartLine,
    ChartBar,
    ChartPie
  },

  data (): AppDataInterface {
    return {
      leagues: [],
      teams: [],
      numberOfVisitorsHistory: [],
      pennantRaceHistory: [],
      lineChartCurrentLeague: 0,
      barChartCurrentLeague: 0,
      barChartCurrentSeason: null,
      pieChartCurrentLeague: 0,
      pieChartCurrentSeason: null
    }
  },

  computed: {
    tabLabels (): string[] {
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
    },
    seasonOptionList (): number[] {
      return this.numberOfVisitorsHistory.map(h => h.season)
    },
    barChartCurrentSeasonList (): number[] {
      const currentSeason = this.numberOfVisitorsHistory.find(h => h.season === this.barChartCurrentSeason)
      if (!currentSeason) {
        return []
      }
      return currentSeason
        .data
        .map(d => d.value / 1000)
    },
    barChartPropsList (): { id: number, name: string, color: string, isVisible: boolean }[] {
      return this.teams
        .map(t => ({
          id: t.id,
          name: t.name,
          color: t.color,
          isVisible: t.league === this.barChartCurrentLeague
        }))
    },
    pieChartCurrentSeasonList (): number[] {
      const currentSeason = this.numberOfVisitorsHistory.find(h => h.season === this.pieChartCurrentSeason)
      if (!currentSeason) {
        return []
      }
      return currentSeason
        .data
        .map(d => d.value / 1000)
    },
    pipeChartPropsList (): { id: number, name: string, color: string, isVisible: boolean }[] {
      return this.teams
        .map(t => ({
          id: t.id,
          name: t.name,
          color: t.color,
          isVisible: t.league === this.pieChartCurrentLeague
        }))
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
    },

    handleClickBarChartTabItem (index: number) {
      this.barChartCurrentLeague = index
    },

    handleClickPieChartTabItem (index: number) {
      this.pieChartCurrentLeague = index
    }
  },

  created () {
    this.fetchAll()
      .then(resps => {
        const [leagues, teams, numberOfVisitorsHistory, pennantRaceHistory] = resps
        const lastSeason = Math.max(...numberOfVisitorsHistory.map(h => h.season))

        Object.assign(this, {
          leagues,
          teams,
          numberOfVisitorsHistory,
          pennantRaceHistory,
          barChartCurrentSeason: lastSeason,
          pieChartCurrentSeason: lastSeason
        })
      })
      .catch(err => console.error(err.message))
  }
})
