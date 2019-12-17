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
            path: '/article/:title/:id/detial',
            name: 'detial',
            component: ()=>import('../views/detial'),
            meta:{ title: '文章详情'}
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
        path: '/about/:name/:id',
        name: 'about',
        component: ()=>import('../views/about'),
        meta:{title: '关于'}
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
