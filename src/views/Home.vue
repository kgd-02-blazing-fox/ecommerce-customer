<template>
  <div>
    <div class="container-fluid shadow sticky-top" id="colors">
    <Nav/>
    </div>

    <div class="position-sticky sticky-top colini">
        <Alert
        v-if="alert.isOn === true"
        :message="alert.message"
        />
    </div>

    <div v-if="!this.$route.params.productId">
      <Promo/>
    </div>

    <div class="continer-fluid">
      <div class="col">
        <div class="row">

          <router-view/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Promo from '@/components/Promo.vue'
import Alert from '@/components/Alert.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    Promo,
    Alert
  },
  computed: {
    alert () {
      return this.$store.state.alert
    }
  }
}
</script>

<style scoped>
#colors{
  background-color: #2e86de;
}

</style>
