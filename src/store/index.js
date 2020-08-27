import Vue from 'vue'
import Vuex from 'vuex'
import ServerAPI from '../server/ServerAPI'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    userCart: [],
    spesificProduct: {},
    alert: {
      isOn: false,
      message: ''
    }
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_SPESIFIC_PRODUCTS (state, payload) {
      state.spesificProduct = payload
    },
    ALERT (state, payload) {
      state.alert = {
        isOn: true,
        message: payload
      }
      setTimeout((_) => {
        state.alert = {
          isOn: false,
          message: payload
        }
      }, 3000)
    },
    SET_USER_CART (state, payload) {
      state.userCart = payload
    }
  },
  actions: {
    login (context, payload) {
      ServerAPI({
        method: 'POST',
        url: 'user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user', payload.email)
          context.commit('ALERT', `Welcome ${payload.email}`)
          router.push('/')
        })
        .catch((err) => {
          context.commit('ALERT', 'login failed, lets create an account')
          setTimeout((_) => {
            router.push('/register')
          }, 3000)
          console.log(err)
        })
    },
    logout (context, payload) {
      context.commit('ALERT', 'logout successful')
      localStorage.clear()
    },
    register (context, payload) {
      ServerAPI({
        method: 'POST',
        url: 'user/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          context.commit('ALERT', 'Welcome and please login')
          setTimeout((_) => {
            router.push('/login')
          }, 3000)
        })
        .catch((err) => {
          router.push('/register')
          console.log(err)
        })
    },
    fetchProducts (context) {
      ServerAPI({
        method: 'GET',
        url: 'products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.table(err)
          context.commit('ALERT', 'FETCH FAILED')
        })
    },
    fetchProductsSpesific (context, id) {
      ServerAPI({
        method: 'GET',
        url: 'products/user/' + id
      })
        .then(({ data }) => {
          context.commit('SET_SPESIFIC_PRODUCTS', data)
        })
        .catch((err) => {
          console.table(err)
          context.commit('ALERT', 'FETCH FAILED')
        })
    },
    addToCart (context, payload) {
      // console.log(payload)
      ServerAPI({
        method: 'POST',
        url: 'user/cart/',
        data: {
          ProductId: payload.id,
          ammount: payload.quantity
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getUserCart')
          router.push('/')
          context.commit('ALERT', 'Added to cart!')
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    },
    getUserCart (context, payload) {
      ServerAPI({
        method: 'GET',
        url: 'user/cart/',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_USER_CART', data)
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    },
    destryoItemFromCart (context, payload) {
      console.log(payload)
      ServerAPI({
        method: 'DELETE',
        url: 'user/cart/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getUserCart')
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    },
    addItemQuantityInCart (context, payload) {
      ServerAPI({
        method: 'PUT',
        url: `user/cart/${payload}/increment`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getUserCart')
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    },
    reduceItemQuantityInCart (context, payload) {
      ServerAPI({
        method: 'PUT',
        url: `user/cart/${payload}/decrement`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getUserCart')
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    },
    checkout (context) {
      ServerAPI({
        method: 'DELETE',
        url: 'user/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getUserCart')
          router.push('/')
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    },
    stockUpdate (context, payload) {
      ServerAPI({
        method: 'POST',
        url: 'products/stock',
        data: {
          payload
        }
      })
        .then(({ data }) => {
          console.log(data)
          // context.dispatch('getUserCart')
          // router.push('/')
        })
        .catch((err) => {
          context.commit('ALERT', err.message)
          console.log(err)
        })
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    spesificProduct (state) {
      return state.spesificProduct
    },
    InsideUserCart (state) {
      return state.userCart
    }
  }
})
