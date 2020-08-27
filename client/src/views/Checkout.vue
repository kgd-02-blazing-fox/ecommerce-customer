<template>
  <div class="container p-2" style="height: 140px;">
    <h1 style="font-weight: 700;color:rgb(165, 82, 243)">Checkout:</h1>
    <br />

    <!-- checkout cards -->

    <CheckoutCard
      v-for="(item,i) in cart"
      :key="i"
      :product="item"
     />

    <div class="container">
      <h3 style=" font-weight: 700;">Total: {{total}}</h3>
      <button
        class="btn btn-outline-light my-2 my-sm-0 mx-1"
        style="background-color: rgb(193, 130, 252);"
        type="submit"
        @click.prevent="initiateCheckout"
      >Checkout</button>
      <br />
      <h3 style=" color: red;" v-if="failed">Something erronous happened..</h3>
      <h3 style=" color: green;" v-if="success">Thank you for purchasing! You will be redirected soon..</h3>
    </div>
  </div>
</template>

<script>
import CheckoutCard from '../components/CheckoutCard.vue'
import axios from 'axios'
export default {
  name: 'Checkout',
  data () {
    return {
      success: false,
      failed: false
    }
  },
  methods: {
    initiateCheckout () {
      if (confirm('Are you sure?')) {
        axios({
          method: 'DELETE',
          url: 'http://localhost:3000/carts',
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(response => {
            this.failed = false
            this.success = true
            setTimeout(() => {
              this.$router.push('/shop')
            }, 3000)
          })
          .catch(err => {
            console.log(err)
            this.failed = true
            this.success = false
          })
      }
    }
  },
  components: {
    CheckoutCard
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    total () {
      let total = 0
      this.$store.state.cart.forEach(el => {
        total += (el.Product.price * el.amount)
      })
      return total
    }
  }
}
</script>

<style>
</style>
