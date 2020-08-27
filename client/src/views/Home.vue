<template>
  <div class="home">
    <Navbar />
    <div class="row justify-content-center">
      <Product
      v-for="product in products"
      :key="product.id"
      :product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Product from '@/components/Product.vue'

export default {
  name: 'Home',
  components: {
    Product,
    Navbar
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>
