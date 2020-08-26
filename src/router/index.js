import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
      },
      {
        path: '/register',
        component: () => import(/* webpackChunkName: "register" */ '../components/Register.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "productcards" */ '../components/Products.vue')
      },
      {
        path: '/details/:productId',
        component: () => import(/* webpackChunkName: "detailsproduct" */ '../components/Details.vue')
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
