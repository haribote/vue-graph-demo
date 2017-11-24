import Vue from 'vue'
import App from './components/App/app.vue'

Vue.config.productionTip = false

/* tslint:disable-next-line:no-unused-expression */
new Vue({
  el: '#app',
  render: h => h(App)
})
