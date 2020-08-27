<template>
  <div>
  <div class="container p-5 ml-4">
    <div class="text-center">
      <img :src="specific.image_url" alt="Gambar" style="max-width: 200px; max-height: 300px; object-fit: cover">
        <br>
          <br>
            <div>
                <h1>{{specific.name}}</h1>
                <h4 class="text-secondary">{{specific.price}}</h4>
                <h4 class="text-secondary">Warehouse Stock : {{specific.stock}}</h4>
                <h4 class="text-secondary">Category : {{specific.category}}</h4>

                <div class="container d-inline-flex justify-content-center">
                  <label class="btn btn-white btn-lg mb-0">
                    <input type="button" name="button" style="display: none;" @click.prevent="decrement"><i class="fas fa-chevron-circle-left" style="color:rgb(165, 82, 243)"></i>
                  </label>

                  <label class="btn btn-white btn-lg mb-0">
                    <input type="text" name="text" class="w-25 text-center" value="1" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" v-model="amount">
                  </label>

                  <label class="btn btn-white btn-lg mb-0">
                    <input type="button" name="button" style="display: none;" @click.prevent="increment"><i class="fas fa-chevron-circle-right" style="color:rgb(165, 82, 243)"></i>
                  </label>
                </div>
                <button class="btn btn-outline-light mx-1 mx-auto mt-2" style="background-color: rgb(193, 130, 252);" @click.prevent="AddCart">Add to Cart</button>
                <p style="color: green;" class="mt-2" v-if="successMessage">{{successMessage}}</p>
                <p style="color: red;" class="mt-2" v-if="errorMessage">{{errorMessage}}</p>
              </div>
              </div>
            </div>
            <div class="pt-5 container-fluid d-inline justify-content-between">
                <button class="btn btn-success" @click.prevent="back">Back to shop</button>
    </div>
  </div>
</template>

<script>
import Axios from '../server/Axios.js'

export default {
  name: 'ItemInfo',
  data () {
    return {
      amount: 1,
      errorMessage: '',
      successMessage: ''
    }
  },
  computed: {
    specific () {
      return this.$store.state.products.filter(el => { return el.id === Number(this.$route.params.id) })[0]
    }
  },
  created () {
    this.$store.dispatch('fetch')
      .then(response => {
        this.$store.commit('SET_PRODUCTS', response.data)
        this.$store.state.products.forEach(el => {
          if (el.id === Number(this.$route.params.id)) {
            this.name = el.name
            this.image_url = el.image_url
            this.price = el.price
            this.stock = el.stock
            this.category = el.category
          }
        })
      })
      .catch(err => console.log(err))
  },
  methods: {
    increment () {
      if (this.amount < this.stock) {
        this.amount++
      }
    },
    decrement () {
      if (this.amount > 1) {
        this.amount--
      }
    },
    AddCart () {
      if (localStorage.getItem('access_token')) {
        if (this.amount > this.stock) {
          this.errorMessage = 'You cannot buy more than the stock have'
        } else if (this.amount < 0) {
          this.errorMessage = ':/'
        } else {
          Axios({
            method: 'POST',
            url: 'carts',
            headers: { access_token: localStorage.getItem('access_token') },
            data: {
              ProductId: Number(this.$route.params.id),
              amount: this.amount
            }
          })
            .then(response => {
              this.errorMessage = ''
              this.successMessage = 'Product successfuly added to cart!'
              this.$store.dispatch('fetch')
                .catch(err => console.log(err.response.data))
            })
            .catch(err => {
              this.successMessage = ''
              this.errorMessage = err.response.data.message
            })
        }
      } else this.$router.push('/login')
    },
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
