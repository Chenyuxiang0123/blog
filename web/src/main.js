import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from '../src/axios/http'
import store from './store/index'
import moment from 'moment'

Vue.prototype.$http = http
Vue.config.productionTip = false

//定义格式化时间全局过滤器
moment.locale('zh-cn');
Vue.filter('formatDate',(dateStr,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
  return moment(dateStr).format(pattern)
})

router.beforeEach((to,from,next)=>{
  let title = to.path.split('/')[2]
  if(to.path === '/'){
    document.title = '我的博客 | 学习笔记'
    next()
  }else if(to.path === '/tabs' || to.path === '/articlies/list' || to.path === '/search/detail'){
    window.document.title = to.meta.title + '-我的博客 | 学习笔记'
    next()
  }else if(title === 'article'){
    title = to.path.split('/')[3]
    window.document.title = title + '-文章详情-我的博客 | 学习笔记'
    next()
  }else{
    window.document.title = title + '-我的博客 | 学习笔记'
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
