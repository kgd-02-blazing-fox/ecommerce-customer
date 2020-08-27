<template>
  <div class="row border-bottom m-2">
              <div class="col-3 p-0 m-0 h-100">
                <img
                :src="cart.Product.image_url"
                alt="No image Preview" style="max-height: 100px; object-fit: cover;">
              </div>
              <div class="col-9 p-0 m-0 h-100 d-inline">
                <label class="btn btn-white btn-lg float-right ">
                  <input type="button" name="button" style="display: none;" ><i class="fas fa-trash-alt" style="color:rgb(165, 82, 243)" @click.prevent="del"></i>
                </label>
                <div class="card-body text-left pt-0 mt-2">
                  <h4 class="card-title">{{cart.Product.name}}</h4>
                  <span class="card-text">{{cart.Product.price}}</span> <br>
                  <span class="card-text">Amount: <b> {{cart.amount}} pcs</b></span> <br>
                  <span class="card-text" style="font-size: 0.8em">Purchased at: {{purchasedAtFormatter}}</span> <br>
                  <span class="card-text" style="color: red" v-if="errorMessage">{{errorMessage}}</span> <br>
                </div>
              </div>
            </div>
</template>

<script>
import Axios from '../server/Axios.js'
export default {
  name: 'CheckoutCard',
  props: ['cart'],
  data () {
    return {
      errorMessage: ''
    }
  },
  computed: {
    purchasedAtFormatter () {
      return this.cart.purchasedAt.toString().slice(0, this.cart.purchasedAt.toString().indexOf('T'))
    }
  },
  methods: {
    del () {
      if (confirm(`Remove '${this.cart.Product.name}' from history?`)) {
        Axios({
          method: 'DELETE',
          url: `carts/${this.cart.id}`,
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(response => {
            this.$store.dispatch('fetch')
              .catch(err => console.log(err.response.data))
          })
          .catch(err => {
            this.errorMessage = err.response.data.message
          })
      }
    }
  }
}
</script>

<style>

</style>
