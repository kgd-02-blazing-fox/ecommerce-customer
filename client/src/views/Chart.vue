<template>
  <div class="my-chart">
    <Navbar />
    <router-link style="margin-bottom:20px" class="btn btn-outline-success" to="/checkout">Go To Checkout</router-link>
    <div class="row justify-content-center">
      <ProductChart
      v-for="cart in products"
      :key="cart.id"
      :cart="cart"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import ProductChart from '@/components/ProductChart.vue'

export default {
  name: 'Home',
  components: {
    ProductChart,
    Navbar
  },
  created () {
    this.$store.dispatch('fetchCharts')
  },
  computed: {
    products () {
      return this.$store.state.charts
    }
  }
}
</script>
