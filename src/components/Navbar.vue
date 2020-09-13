<template>
  <div class="navbar-fixed">
    <nav class="black text-white">
      <div class="container">
        <div class="nav-wrapper">
          <router-link to="/"><a id="webTitle">Digi-One</a></router-link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/customer"><a>Your Account</a></router-link></li>
            <li><router-link to="/cart"><a>Cart</a></router-link></li>
            <li><router-link to="/my_order"><a>My Order</a></router-link></li>
            <li><a @click.prevent="logoutCustomer">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/customer"><a>Your Account</a></router-link></li>
      <li><router-link to="/cart"><a>Cart</a></router-link></li>
      <li><router-link to="/my_order"><a>My Order</a></router-link></li>
      <li><a @click.prevent="logoutCustomer">Logout</a></li>
    </ul>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'Navbar',
  methods: {
    logoutCustomer () {
      localStorage.clear()
      this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    const sidenav = document.querySelectorAll('.sidenav')
    M.Sidenav.init(sidenav)
  }
}
</script>

<style scoped>
  #webTitle {
    font-size: 30px;
    font-weight: bolder;
  }
</style>
