<template>
  <div class="container p-2" style="height: 140px;">
    <h1 style="font-weight: 700;color:rgb(165, 82, 243)">Checkout:</h1>
    <br />

    <CheckoutCard
      v-for="(item,i) in cart"
      :key="i"
      :cart="item"
     />

    <div class="container">
      <h3 style=" font-weight: 700;" v-if="cart.length">Total: {{total}}</h3>
      <button
        class="btn btn-outline-light my-2 my-sm-0 mx-1"
        style="background-color: rgb(193, 130, 252);"
        type="submit"
        @click.prevent="initiateCheckout"
        v-if="cart.length"
      >Checkout</button>
      <h3 v-if="!cart.length">You haven't buy anything yet!</h3>
      <br />
      <h3 style=" color: red;" v-if="failed">Something erronous happened..</h3>
      <h3 style=" color: red;" v-if="errorMessage.length">{{errorMessage}}</h3>
      <h3 style=" color: green;" v-if="success">Thank you for your purchase! You will be redirected soon..</h3>
    </div>
  </div>
</template>

<script>
import CheckoutCard from '../components/CheckoutCard.vue'
import Axios from '../server/Axios.js'
export default {
  name: 'Checkout',
  data () {
    return {
      success: false,
      failed: false,
      errorMessage: ''
    }
  },
  created () {
    this.$store.commit('SET_LOGGED')
    this.$store.dispatch('fetch')
      .catch(err => console.log(err.response.data))
  },
  methods: {
    initiateCheckout () {
      let valid = true
      this.$store.state.cart.forEach(cart => {
        if (!cart.history) {
          this.$store.state.products.forEach(prod => {
            if (cart.ProductId === prod.id) {
              if (prod.stock - cart.amount < 0) {
                valid = false
                this.errorMessage = `${prod.name} does not have enough stock`
              }
            }
          })
        }
      })
      if (valid && confirm('Are you sure?')) {
        Axios({
          method: 'PATCH',
          url: 'carts',
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(response => {
            this.failed = false
            this.errorMessage = ''
            this.success = true
            this.$store.state.cart.forEach(el => {
              if (!el.history) {
                Axios({
                  method: 'PATCH',
                  url: 'products',
                  headers: { access_token: localStorage.getItem('access_token') },
                  data: {
                    amount: el.amount,
                    id: el.ProductId
                  }
                })
                  .catch(err => { console.log(err.response.data) })
              }
            })
            setTimeout(() => {
              this.$router.push('/')
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
      return this.$store.state.cart.filter(el => { return el.history === false })
    },
    total () {
      let total = 0
      this.$store.state.cart.forEach(el => {
        if (!el.history) {
          total += (el.Product.price * el.amount)
        }
      })
      return total
    }
  }
}
</script>

<style>
</style>
