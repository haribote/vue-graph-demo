import Vue from 'vue'
import 'core-js/es6/array'

export default Vue.extend({
  name: 'TabList',

  props: {
    labels: {
      type: Array,
      required: true,
      validator (array) {
        return array.every(val => typeof val === 'string')
      }
    }
  },

  data () {
    return {
      current: 0
    }
  },

  methods: {
    handleClickItem (index: number): void {
      this.current = Math.max(0, Math.min(index, this.labels.length - 1))
      this.$emit('click-item', index)
    }
  }
})
