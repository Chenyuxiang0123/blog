import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children:[
      {
        path: '/',
        name: 'homePage',
        component:()=>import('../views/homePage')
      },
      {
        path: '/articlies/list',
        name: 'articliesList',
        component:()=>import('../views/article/articliesList')
      },
      {
        path: '/articlies/add',
        name: 'articliesAdd',
        component:()=>import('../views/article/articliesAdd')
      },
      {
        path: '/articlies/edit/:id',
        name: 'articliesEdit',
        component:()=>import('../views/article/articliesEdit'),
        props: true
      },
      {
        path: '/categories/list',
        name: 'categoriesList',
        component:()=>import('../views/category/categoriesList')
      },
      {
        path: '/categories/edit/:id',
        name: 'categoriesEdit',
        component:()=>import('../views/category/categoriesEdit'),
        props: true
      },
      {
        path: '/categories/add',
        name: 'categoriesAdd',
        component:()=>import('../views/category/categoriesAdd')
      },
      {
        path: '/tag/add',
        name: 'ctagAdd',
        component:()=>import('../views/tag/tagAdd')
      },
      {
        path: '/tag/list',
        name: 'tagList',
        component:()=>import('../views/tag/tagList')
      },
      {
        path: '/tag/edit/:id',
        name: 'tagEdit',
        component:()=>import('../views/tag/tagEdit'),
        props: true
      },
      {
        path: '/user/edit',
        name: 'userEdit',
        component:()=>import('../views/user/userEdit')
      },
      {
        path: '/user/add',
        name: 'userAdd',
        component:()=>import('../views/user/userAdd')
      },
      {
        path: '/user/list',
        name: 'userList',
        component:()=>import('../views/user/userList')
      },
      {
        path: '/comment',
        name: 'comment',
        component:()=>import('../views/comment')
      },
      {
        path: '/message',
        name: 'message',
        component:()=>import('../views/message')
      },
      {
        path: '/banner',
        name: 'banner',
        component:()=>import('../views/banner')
      },
      {
        path: '/setting',
        name: 'setting',
        component:()=>import('../views/setting')
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
