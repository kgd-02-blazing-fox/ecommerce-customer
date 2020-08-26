import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance'
import router from '../router/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    postRegister (_, payload) {
      axios.post('/users/register', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          console.log('===================')
          console.log('Berhasil Register')
          console.log(data)
          console.log('===================')
        })
    },
    postLogin (_, payload) {
      axios.post('/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          console.log('===================')
          console.log('Berhasil Login')
          console.log(data)
          console.log('===================')
          localStorage.setItem('token', data.token)
          router.push({ path: '/' })
        })
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('FETCH_PRODUCTS', data)
        })
        .catch(console.log)
    }
  },
  modules: {
  }
})
