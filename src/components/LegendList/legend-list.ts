import Vue from 'vue'

export default Vue.extend({
  name: 'LegendList',

  props: {
    series: {
      type: Array,
      default () {
        return []
      }
    }
  }
})
