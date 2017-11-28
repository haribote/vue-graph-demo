import Vue from 'vue'
import 'core-js/fn/promise'

import { fetchNpbLeagues, fetchNpbTeams, fetchNpbNumberOfVisitorsHistory, fetchNpbPennantRaceHistory } from '../../api/driver'

import TabList from '../TabList/tab-list.vue'

export default Vue.extend({
  name: 'app',

  components: {
    TabList
  },

  data () {
    return {
      lineChartTabLabels: []
    }
  },

  methods: {
    fetchAll () {
      return Promise.all([
        fetchNpbLeagues(),
        fetchNpbTeams(),
        fetchNpbNumberOfVisitorsHistory(),
        fetchNpbPennantRaceHistory()
      ])
    },

    handleClickLineChartTabItem (index: number) {
      // TODO: 本実装時にテストを書く
      console.log(index)
    }
  },

  created () {
    this.fetchAll()
      .then(resps => {
        const [leagues] = resps

        Object.assign(this, {
          lineChartTabLabels: leagues.map(league => league.name)
        })
      })
      .catch(err => console.error(err.message))
  }
})
