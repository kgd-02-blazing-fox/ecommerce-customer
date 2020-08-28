<template>
  <div class="container p-2" style="height: 140px;">
    <h1 style="font-weight: 700;color:rgb(165, 82, 243)">Purchase History :</h1>
    <br />
    <HistoryCard
      v-for="(item,i) in cart"
      :key="i"
      :cart="item"
     />
  </div>
</template>

<script>
import HistoryCard from '../components/HistoryCard.vue'
export default {
  name: 'History',
  created () {
    this.$store.commit('SET_LOGGED')
    this.$store.dispatch('fetch')
      .catch(err => console.log(err.response.data))
  },
  components: {
    HistoryCard
  },
  computed: {
    cart () {
      return this.$store.state.cart.filter(el => { return el.history === true })
    }
  }
}
</script>

<style>
</style>
