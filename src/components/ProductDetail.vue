<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="col s12 m8">
        <h4 class="center">{{product.name}}</h4>
        <div class="row">
          <div class="col s12 m6 push-m3 center">
            <img :src="product.image_url" class="materialboxed">
          </div>
        </div>
        <div class="row">
          <div class="col s12 m10 push-m1 center">
            <h5 class="left-align">Description</h5>
            <p class="left-align">{{ product.description }}</p>
            <h5 class="left-align">Category</h5>
            <p class="left-align">{{ product.category}}</p>
            <h5 class="left-align">Price</h5>
            <p class="left-align">{{ priceConverter(product.price) }}</p>
            <h5 class="left-align">Stock</h5>
            <p class="left-align" v-if="product.stock == 0">Empty</p>
            <p class="left-align" v-else>{{ product.stock }}</p>
          </div>
        </div>
        <router-link :to="'/dashboard'"><button class="btn grey darken-3 z-depth-3"><i class="material-icons left">arrow_back</i>Back</button></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import server from '../api/index'
import Navbar from '../components/Navbar'
import M from 'materialize-css/dist/js/materialize.min.js'
import priceConverter from '../helpers/priceConverter'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    priceConverter: priceConverter,
    getProductById () {
      server({
        method: 'get',
        url: `/product/${this.$route.params.id}`
      })
        .then(response => {
          this.product = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
      this.getProductById()
    }
  },
  mounted () {
    const materialbox = document.querySelectorAll('.materialboxed')
    M.Materialbox.init(materialbox)
  }
}
</script>

<style scoped>
  #productDetail {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  img {
    height: 300px
  }
  p {
    font-weight:100;
  }
  h4, h5 {
    font-weight: bolder;
  }
  .container {
    padding-bottom: 20px;
  }
</style>>
