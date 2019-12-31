import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import Main from '../components/index/main'
import MyIndex from '../components/index/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children:[
      {
        path: '/',
        component: MyIndex,
        children:[
          {
            path: '/',
            component: Main
          },
          {
            path: '/category/:name/:id',
            name: 'category',
            component: ()=>import('../views/category')
          },
          {
            path: '/detail/article/:title/:id',
            name: 'detial',
            component: ()=>import('../views/detail'),
            meta: { title: '文章详情'},
            props: true
          },
          {
            path: '/tabs/detail/:title/:id',
            name: 'tabDetail',
            component: ()=>import('../views/tabDetail'),
            meta: {title: '标签详情'},
            props: true
          }
        ]
      },
      {
        path: '/message/:name/:id',
        name: 'message',
        component: ()=>import('../views/message'),
        meta:{title: '留言板'}
      },
      {
        path: '/tabs',
        name: 'tab',
        component: ()=>import('../views/tabs'),
        meta:{title: '标签云'}
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
