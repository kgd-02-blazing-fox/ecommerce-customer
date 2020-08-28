<template>
  <div class="container-fluid" v-if="!view">
            <CardV
             v-for="(item,index) in products"
             :key="index"
             :product = item
            />
          </div>
          <div class="container-fluid d-inline-block" v-else>
            <h1>To be Implemented!</h1>
            <!-- <card-h />
            <CardH
             v-for="(item,index) in products"
             :key="index"
             :products = item
            /> -->
  </div>
</template>

<script>
// import CardH from '../components/CardH.vue'
import CardV from '../components/CardV.vue'
export default {
  name: 'CardContainer',
  data () {
    return {
      gridView: false
    }
  },
  mounted () {
    this.$store.commit('SET_LOGGED')
    this.$store.dispatch('fetch')
      .then(response => {
        this.$store.commit('SET_PRODUCTS', response.data)
      })
      .catch(err => console.log(err))
  },
  computed: {
    products () {
      const filteredCategory = this.$store.state.products.filter(el => { return el.category.includes(this.$store.state.categoryFilter) })
      const filteredSearch = filteredCategory.filter(el => { return el.name.toLowerCase().includes(this.$store.state.nameFilter.toLowerCase()) })
      return filteredSearch
    },
    view () {
      return this.$store.state.view
    }
  },
  components: {
    // CardH,
    CardV
  }
}
</script>

<style>

</style>
