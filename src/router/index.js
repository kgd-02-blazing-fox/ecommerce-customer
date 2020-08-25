import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
    children: [
      {
        path: '',
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
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
