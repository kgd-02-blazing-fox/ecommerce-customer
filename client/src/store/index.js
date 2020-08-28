import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../server/Axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    products: [],
    cart: [],
    favorite: [],
    nameFilter: '',
    categoryFilter: '',
    view: false
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
    },
    SET_VIEW (state, payload) {
      state.view = payload
    },
    SET_NAME (state, payload) {
      state.nameFilter = payload
    },
    SET_CATEGORY (state, payload) {
      state.categoryFilter = payload
    }
  },
  actions: {
    fetch (context) {
      if (localStorage.getItem('access_token')) {
        return Axios({
          method: 'GET',
          url: 'favorites',
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(response => {
            context.commit('SET_FAVORITE', response.data)
            return Axios({
              method: 'GET',
              url: 'carts',
              headers: { access_token: localStorage.getItem('access_token') }
            })
          })
          .then(response => {
            context.commit('SET_CART', response.data)
            return Axios({
              method: 'GET',
              url: 'products'
            })
          })
      } else {
        return Axios({
          method: 'GET',
          url: 'products'
        })
      }
    }
  },
  modules: {
  }
})
