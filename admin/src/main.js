import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './axios/http'
import Highlight from './utils/highlight'
import './plugins/element.js'

Vue.use(Highlight)
Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
