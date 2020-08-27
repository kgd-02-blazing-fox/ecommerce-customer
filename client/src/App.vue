<template>
  <div id="app">
    <nav class="navbar navbar-light justify-content-between" style="background-color: rgb(165, 82, 243);">
    <div class="container">
      <a class="navbar-brand" @click.prevent="home">
        <img src="./assets/trolleywhite.png" alt="E-commerce" height="30">
        <span style="font-weight: 700; color: white;;"> E-commerce</span>
      </a>
      <span class="form-inline">
        <button class="btn btn-outline-light my-2 my-sm-0 mx-3" style="background-color: rgb(193, 130, 252);" @click.prevent="toShop" >Shop</button>
        <button class="btn btn-outline-light my-2 my-sm-0 mx-3" style="background-color: rgb(193, 130, 252);" @click.prevent="login" v-if="!isLogged">Login</button>
        <googleLogin :params="params" :logoutButton=true :onSuccess="logout" class="btn btn-outline-light my-2 my-sm-0 mx-1" style="background-color: rgb(193, 130, 252);" v-if="isLogged">Logout</googleLogin>
      </span>
    </div>
  </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
  name: 'App',
  data () {
    return {
      params: {
        client_id: '124739969343-6vfnqc1fk4kniu587sn91ep7vtativjg.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    toShop () {
      this.$router.push('/shop')
    },
    logout () {
      console.log('here')
      localStorage.removeItem('access_token')
      this.$router.push('/login')
      this.$store.commit('SET_LOGGED')
    },
    login () {
      this.$router.push('/login')
    }
  },
  computed: {
    isLogged () {
      return this.$store.state.isLogged
    }
  },
  created () {
    this.$store.commit('SET_LOGGED')
  },
  components: {
    GoogleLogin
  }
}
</script>

<style>

</style>
