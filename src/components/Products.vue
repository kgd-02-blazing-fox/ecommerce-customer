<template>
  <div class="col">
    <div class="row">
      <ProductCards
      v-for="item in products"
      :key="item.id"
      :item="item"
      />
    </div>
  </div>
</template>

<script>
import ProductCards from '@/components/ProductCards.vue'

export default {
  name: 'Products',
  components: {
    ProductCards
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.getters.products
    }
  }
}
</script>

<style>

</style>
