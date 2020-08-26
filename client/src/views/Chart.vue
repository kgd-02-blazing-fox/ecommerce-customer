<template>
  <div class="my-chart">
    <h1>This is an mychhart page</h1>
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
import ProductChart from '@/components/ProductChart.vue'

export default {
  name: 'Home',
  components: {
    ProductChart
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
