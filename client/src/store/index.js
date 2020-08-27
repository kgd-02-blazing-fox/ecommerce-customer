import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance'
import router from '../router/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    charts: []
  },
  mutations: {
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },
    FETCH_CHARTS (state, payload) {
      state.charts = payload
    }
  },
  actions: {
    postRegister (_, payload) {
      axios.post('/users/register', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          // console.log('===================')
          // console.log('Berhasil Register')
          // console.log(data)
          // console.log('===================')
          router.push({ path: '/login' })
        })
    },
    postLogin (_, payload) {
      axios.post('/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          // console.log('===================')
          // console.log('Berhasil Login')
          // console.log(data)
          // console.log('===================')
          localStorage.setItem('token', data.token)
          router.push({ path: '/' })
        })
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          commit('FETCH_PRODUCTS', data)
        })
        .catch(console.log)
    },
    fetchCharts ({ commit }) {
      axios({
        method: 'GET',
        url: '/chart/show',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('FETCH_CHARTS', data.charts)
        })
        .catch(console.log)
    },
    addToCart ({ dispatch }, payload) {
      // console.log(payload)
      axios({
        method: 'POST',
        url: '/chart/add',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          quantity: payload.quantity,
          ProductId: payload.ProductId
        }
      })
        .then(({ data }) => {
          // console.log('Success Add')
          // console.log(data)
          dispatch('fetchCharts')
          // router.push({ path: '/chart' })
        })
        .catch(console.log)
    },
    removeFromCart ({ dispatch }, payload) {
      axios({
        method: 'DELETE',
        url: '/chart/delete',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload.ProductId
        }
      })
        .then(({ data }) => {
          // console.log('Success Delete')
          // console.log(data)
          dispatch('fetchCharts')
        })
        .catch(console.log)
    },
    minCart ({ dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: '/chart/min',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          ProductId: payload.ProductId
        }
      })
        .then(({ data }) => {
          // console.log('Success Min')
          // console.log(data)
          dispatch('fetchCharts')
          // router.push({ path: '/chart' })
        })
        .catch(console.log)
    }
  },
  modules: {
  }
})
