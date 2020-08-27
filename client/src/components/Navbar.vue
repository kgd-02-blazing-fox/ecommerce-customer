<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <router-link class="navbar-brand" style="color: blue" to="/">E-Commerce</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link style="color: blue" class="nav-link" to="/chart"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg>Cart</router-link>
        </li>
      </ul>
      <a v-if="isLogin" @click.prevent="logout" class="btn btn-danger">Logout</a>
      <router-link v-if="!isLogin" class="btn btn-outline-success" to="/login">Login</router-link>
      <router-link v-if="!isLogin" style="margin-left:10px;" class="btn btn-success" to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
    }
  }
}
</script>

<style>
.navbar {
  margin-bottom: 20px;
}
</style>
