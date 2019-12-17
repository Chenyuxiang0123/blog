import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from '../src/axios/http'

Vue.prototype.$http = http
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  let title = to.path.split('/')[2]
  if(to.path === '/'){
    document.title = '我的博客 | 学习笔记 & 生活点滴'
    next()
  }else if(to.path === '/category/首页/5df36850ffbcac31304b7be8'){
    document.title = '我的博客 | 学习笔记 & 生活点滴'
    next('/')
  }else if(to.path === '/tabs'){
    window.document.title = to.meta.title + '-我的博客 | 学习笔记 & 生活点滴'
    next()
  }else{
    window.document.title = title + '-我的博客 | 学习笔记 & 生活点滴'
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
