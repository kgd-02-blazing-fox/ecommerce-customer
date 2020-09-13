<template>
  <div>
    <Navbar></Navbar>
    <NotifSection></NotifSection>
    <div id="dashboard" class="container">
      <div class="row">
        <ProductCard v-for="product in productsList" :key="product.id" :product="product"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import NotifSection from '../components/NotifSection'
import Navbar from '../components/Navbar'

export default {
  name: 'Dashboard',
  components: {
    ProductCard, Navbar, NotifSection
  },
  computed: {
    productsList () {
      return this.$store.state.productsList
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
    }
  }
}
</script>

<style scoped>

</style>
