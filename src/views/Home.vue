<template>
  <div>
    <div class="container-fluid shadow sticky-top" id="colors">
    <Nav
    @openCart="openCart"
    @closeCart="closeCart"
    />
    </div>

    <div class="position-sticky sticky-top colini">
        <Alert
        v-if="alert.isOn === true"
        :message="alert.message"
        />
    </div>

    <div
    v-if="isOpenCart"
    class="position-sticky sticky-top colini d-flex justify-content-center">
      <Cart
      @closeCart="closeCart"
      />
    </div>

    <div class="my-2" v-if="!this.$route.params.productId">
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
import Cart from '@/components/Cart.vue'

export default {
  name: 'Home',
  data () {
    return {
      isOpenCart: false
    }
  },
  methods: {
    openCart () {
      this.isOpenCart = true
    },
    closeCart () {
      this.isOpenCart = false
    }
  },
  components: {
    Nav,
    Promo,
    Alert,
    Cart
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
  background: -webkit-linear-gradient(to right, #f1c40f, #d35400);
  background: linear-gradient(to right, #e67e22, #f1c40f);
}

</style>
