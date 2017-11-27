import Vue from 'vue'

import TabList from '../TabList/tab-list.vue'

export default Vue.extend({
  name: 'app',

  components: {
    TabList
  },

  data () {
    return {
      lineChartTabLabels: ['Pacific League', 'Central League']
    }
  },

  methods: {
    handleClickLineChartTabItem (index: number) {
      // TODO: 本実装時にテストを書く
      console.log(index)
    }
  }
})
