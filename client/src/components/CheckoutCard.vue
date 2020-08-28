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
                  <span class="card-text" style="font-size: 0.8em">Product left: {{cart.Product.stock}} pcs</span> <br>
                  <span class="card-text" style="color: red" v-if="errorMessage">{{errorMessage}}</span> <br>
                  <span class="card-text" style="color: green" v-if="successMessage">{{successMessage}}</span> <br>
                  <label class="btn btn-white btn-lg float-right mb-0 p-0">
                    <input type="button" name="button" style="display: none;" @click.prevent="update">Update <i class="fas fa-check" style="color:green"></i>
                  </label>
                  <label class="float-right mb-0" style="width: 120px">
                    <input type="button" name="button" style="display: none;"><i class="fas fa-chevron-circle-left" style="color:rgb(165, 82, 243)" @click.prevent="decrement"></i>
                    <input type="number" name="text" class="w-25 text-center" v-model="amount" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);">
                    <input type="button" name="button" style="display: none;"><i class="fas fa-chevron-circle-right" style="color:rgb(165, 82, 243)" @click.prevent="increment"></i>
                  </label>
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
      amount: this.cart.amount,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    update () {
      if (this.amount > this.cart.Product.stock) {
        this.errorMessage = 'You cannot buy more than the stock have'
        setTimeout(() => { this.errorMessage = '' }, 2000)
      } else if (this.amount < 0) {
        this.errorMessage = ':/'
        setTimeout(() => { this.errorMessage = '' }, 2000)
      } else {
        Axios({
          method: 'PUT',
          url: `carts/${this.cart.id}`,
          headers: { access_token: localStorage.getItem('access_token') },
          data: {
            amount: this.amount
          }
        })
          .then(response => {
            this.successMessage = 'Product successfuly updated!'
            this.$store.dispatch('fetch')
              .then(response => { this.amount = 1 })
              .catch(err => console.log(err.response.data))
            setTimeout(() => { this.successMessage = '' }, 1000)
          })
          .catch(err => {
            this.successMessage = ''
            this.errorMessage = err.response.data.message
            setTimeout(() => { this.errorMessage = '' }, 1000)
          })
      }
    },
    increment () {
      if (this.amount < this.cart.Product.stock) {
        this.amount++
      }
    },
    decrement () {
      if (this.amount > 1) {
        this.amount--
      }
    },
    del () {
      if (confirm(`Remove '${this.cart.Product.name}'?`)) {
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
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>

</style>
