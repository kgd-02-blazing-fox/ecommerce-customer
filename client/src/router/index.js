import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginCard from '../components/LoginCard.vue'
import RegisterCard from '../components/RegisterCard.vue'
import ItemInfo from '../components/ItemInfo.vue'
import Checkout from '../views/Checkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    name: 'Home',
    component: Home
  },
  {
    path: '/iteminfo/:id',
    name: 'Item Info',
    component: ItemInfo
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginCard
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterCard
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
