import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Cart from '../components/Cart.vue'
import Customer from '../components/Customer.vue'
import CustomerEdit from '../components/CustomerEdit.vue'
import MyOrder from '../views/MyOrder.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Home from '../components/Home.vue'
import MyAccount from '../views/MyAccount.vue'
import OrderHistory from '../components/OrderHistory.vue'
import CurrentOrder from '../components/CurrentOrder.vue'
import Invoice from '../components/Invoice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/customer',
    name: 'MyAccount',
    component: MyAccount,
    children: [
      {
        path: '',
        name: 'Customer',
        component: Customer
      },
      {
        path: 'edit',
        name: 'CustomerEdit',
        component: CustomerEdit
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/my_order',
    name: 'MyOrder',
    component: MyOrder,
    children: [
      {
        path: '',
        name: 'CurrentOrder',
        component: CurrentOrder
      },
      {
        path: 'history',
        name: 'OrderHistory',
        component: OrderHistory
      },
      {
        path: ':id',
        name: 'Invoice',
        component: Invoice
      }
    ]
  },
  {
    path: '/',
    component: LandingPage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
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
