import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    productsList: [],
    currentNotif: '',
    currentErr: '',
    currentCustomer: '',
    currentCart: [],
    customerCart: []
  },
  mutations: {
    changeLoginStatus (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    setProductsList (state, payload) {
      state.productsList = payload
    },
    changeCurrentNotif (state, payload) {
      state.currentNotif = payload
    },
    changeCurrentErr (state, payload) {
      state.currentErr = payload
    },
    setCurrentCustomer (state, payload) {
      state.currentCustomer = payload
    },
    setCustomerCart (state, payload) {
      state.customerCart = payload
    },
    setCurrentCart (state) {
      var detail = []
      const CartId = +localStorage.CartId
      for (let i = 0; i < state.customerCart.length; i++) {
        if (state.customerCart[i].CartId === CartId && state.customerCart[i].status === 'Created') {
          detail.push(state.customerCart[i])
        }
      }
      state.currentCart = detail
    }
  },
  actions: {
    fetchProductsList (context) {
      server({
        method: 'get',
        url: '/product',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit('setProductsList', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCustomerDetail (context) {
      server({
        method: 'get',
        url: '/customer',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit('setCurrentCustomer', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCustomerCart (context) {
      server({
        method: 'get',
        url: '/customer/cart',
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit('setCustomerCart', response.data.data)
          context.commit('setCurrentCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
