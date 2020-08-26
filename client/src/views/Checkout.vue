<template>
  <div class="container">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nama Product</th>
          <th scope="col">Jumlah</th>
          <th scope="col">Harga Satuan</th>
          <th scope="col">Total Harga</th>
        </tr>
      </thead>
      <tbody>
        <Chart
        v-for="cart in charts"
        :key="cart.id"
        :cart="cart"
        />
      </tbody>
    </table>
    <a>Total Belanja Anda Adalah {{ totalBelanja }}</a>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart.vue'

export default {
  name: 'Checkout',
  components: {
    Chart
  },
  created () {
    this.$store.dispatch('fetchCharts')
  },
  computed: {
    charts () {
      return this.$store.state.charts
    },
    totalBelanja () {
      let total = 0
      this.$store.state.charts.forEach(item => {
        total += item.Product.price * item.quantity
      })
      return total
    }
  }
}
</script>

<style>

</style>
