<template>
  <div>
    <Navbar></Navbar>
    <div class="row" id="myOrderNavbar">
      <div class="col m6 right-align">
        <router-link :to="'/my_order'"><button class="btn btn-large white grey-text text-darken-3 z-depth-0">Current Order</button></router-link>
      </div>
      <div class="col m6 left-align">
        <router-link :to="'/my_order/history'"><button class="btn btn-large white grey-text text-darken-3 z-depth-0">History</button></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'MyOrder',
  components: {
    Navbar
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
  #myOrderNavbar {
    padding-top: 20px;
  }
  button {
    font-weight: bolder;
  }
</style>
