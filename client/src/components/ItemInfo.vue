<template>
  <div>
  <div class="container p-5">
    <div class="text-center">
      <img :src="image_url" alt="Gambar">
        <br>
          <br>
            <div>
                <h1>{{name}}</h1>
                <h4 class="text-secondary">{{price}}</h4>
                <h4 class="text-secondary">Warehouse Stock : {{stock}}</h4>
                <h4 class="text-secondary">Category : {{category}}</h4>

                <div class="container d-inline-flex justify-content-center">
                  <label class="btn btn-white btn-lg mb-0">
                    <input type="button" name="button" style="display: none;" ><i class="fas fa-chevron-circle-left" style="color:rgb(165, 82, 243)"></i>
                  </label>

                  <label class="btn btn-white btn-lg mb-0">
                    <input type="text" name="text" class="w-25 text-center" value="1" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" v-model="amount">
                  </label>

                  <label class="btn btn-white btn-lg mb-0">
                    <input type="button" name="button" style="display: none;" ><i class="fas fa-chevron-circle-right" style="color:rgb(165, 82, 243)"></i>
                  </label>
                </div>
                <button class="btn btn-outline-light mx-1 mx-auto mt-2" style="background-color: rgb(193, 130, 252);" @click.prevent="AddCart">Add to Cart</button>
                <p style="color: green;" class="mt-2" v-if="successMessage">{{successMessage}}</p>
                <p style="color: red;" class="mt-2" v-if="errorMessage">{{errorMessage}}</p>
              </div>
              </div>
            </div>
            <div class="pt-5 container-fluid d-inline justify-content-between">
                <button class="btn btn-success" @click.prevent="back">Back</button>
              <label class="btn btn-white btn-lg float-right ">
                <input type="button" name="button" style="display: none;" ><i class="fas fa-heart" style="color:red"></i>
              </label>
              <label class="btn btn-white btn-lg float-right ">
                <input type="button" name="button" style="display: none;" ><i class="fas fa-heart-broken" style="color:red"></i>
              </label>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Item Info',
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      category: '',
      amount: 1,
      errorMessage: '',
      successMessage: ''
    }
  },
  created () {
    this.$store.dispatch('fetch')
  },
  mounted () {
    this.$store.state.products.forEach(el => {
      if (el.id === Number(this.$route.params.id)) {
        this.name = el.name
        this.image_url = el.image_url
        this.price = el.price
        this.stock = el.stock
        this.category = el.category
      }
    })
  },
  methods: {
    AddCart () {
      if (localStorage.getItem('access_token')) {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/carts',
          headers: { access_token: localStorage.getItem('access_token') },
          data: {
            ProductId: Number(this.$route.params.id),
            amount: this.amount
          }
        })
          .then(response => {
            this.errorMessage = ''
            this.successMessage = 'Product successfuly added to cart!'
          })
          .catch(err => {
            this.successMessage = ''
            this.errorMessage = err.response.data.message
          })
      } else this.$router.push('/login')
    },
    back () {
      this.$router.go(-1)
    }
  },
  computed: {
  }
}
</script>

<style>

</style>
