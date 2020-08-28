import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginCard from '../components/LoginCard.vue'
import RegisterCard from '../components/RegisterCard.vue'
import ItemInfo from '../components/ItemInfo.vue'
import Checkout from '../views/Checkout.vue'
import CardContainer from '../views/CardContainer.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Home',
        component: CardContainer
      },
      {
        path: '/iteminfo/:id',
        name: 'ItemInfo',
        component: ItemInfo
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout
      },
      {
        path: '/history',
        name: 'History',
        component: History
      }
    ]
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
