<template>
  <div>
    <div class="container-fluid shadow" id="colors">
    <Nav/>
    </div>

    <div class="col">
      <Promo/>
    </div>
    <h1>home</h1>

    <div class="continer-fluid">
      <div class="col">
        <div class="row">
          <div class="col-2 bg-warning">kiri</div>
          <div class="col bg-success">
            <div class="row">
              <ProductCards
              v-for="item in products"
              :key="item.id"
              :item="item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Promo from '@/components/Promo.vue'
import ProductCards from '@/components/ProductCards.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    Promo,
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

<style scoped>
#colors{
  background-color: #2e86de;
}

</style>
