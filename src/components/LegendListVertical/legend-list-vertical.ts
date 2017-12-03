import Vue from 'vue'

export default Vue.extend({
  name: 'LegendListVertical',

  props: {
    series: {
      type: Array,
      default () {
        return []
      }
    }
  }
})
