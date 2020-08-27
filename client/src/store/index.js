import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    products: [],
    cart: [],
    favorite: []
  },
  mutations: {
    SET_LOGGED (state) {
      if (localStorage.getItem('access_token')) state.isLogged = true
      else state.isLogged = false
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_FAVORITE (state, payload) {
      state.favorite = payload
    }
  },
  actions: {
    fetch (context) {
      if (localStorage.getItem('access_token')) {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/products'
        })
          .then(response => {
            context.commit('SET_PRODUCTS', response.data)
            return axios({
              method: 'GET',
              url: 'http://localhost:3000/carts',
              headers: { access_token: localStorage.getItem('access_token') }
            })
          })
          .then(response => {
            context.commit('SET_CART', response.data)
            return axios({
              method: 'GET',
              url: 'http://localhost:3000/favorites',
              headers: { access_token: localStorage.getItem('access_token') }
            })
          })
          .then(response => {
            context.commit('SET_FAVORITE', response.data)
          })
          .catch(err => console.log(err))
      } else {
        axios({
          method: 'GET',
          url: 'http://localhost:3000/products'
        })
          .then(response => {
            context.commit('SET_PRODUCTS', response.data)
          })
          .catch(err => console.log(err))
      }
    }
  },
  modules: {
  }
})
