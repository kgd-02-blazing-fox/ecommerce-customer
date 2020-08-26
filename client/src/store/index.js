import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axiosInstance'
import router from '../router/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
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
    }
  },
  modules: {
  }
})
