<template>
  <div class="home">
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
import Product from '@/components/Product.vue'

export default {
  name: 'Home',
  components: {
    Product
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
