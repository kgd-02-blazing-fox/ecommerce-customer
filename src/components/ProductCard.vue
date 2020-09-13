<template>
  <div class="col s12 m4">
    <div class="card z-depth-2 medium hoverable">
      <div class="card-image">
        <img :src="product.image_url" class="materialboxed">
      </div>
      <div class="card-content center">
        <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
        <router-link :to="`/product/${product.id}`"><a id="productTitle" class="blue-text text-darken-3">{{product.name}}</a></router-link>
        <p class="left-align">Price: {{priceConverter(product.price)}}</p>
        <p class="left-align" v-if="product.stock > 0">Stock: {{product.stock}}</p>
        <p class="left-align" v-else>Stock: Empty</p>
        <div class="addProductBtn" v-if="product.stock > 0">
          <button class="btn btn-small blue darken-3 z-depth-1" @click.prevent="addProductToCart(product.id)"><i class="material-icons left">add_shopping_cart</i>Add to Cart</button>
        </div>
      </div>
      <div class="card-reveal">
        <span class="card-title blue-text text-darken-3">{{product.name}}<i class="material-icons right">close</i></span>
        <h6 class="left-align">Category:</h6>
        <p class="left-align">{{product.category}}</p>
        <h6 class="left-align">Description:</h6>
        <p class="left-align">{{product.description}}</p>
        <h6 class="left-align">Price:</h6>
        <p class="left-align">{{priceConverter(product.price)}}</p>
        <h6 class="left-align">Stock:</h6>
        <p class="left-align" v-if="product.stock === 0">Empty</p>
        <p class="left-align" v-else>{{product.stock}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'
import server from '../api/index'
import priceConverter from '../helpers/priceConverter'

export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    currentCart () {
      return this.$store.state.currentCart
    }
  },
  methods: {
    priceConverter: priceConverter,
    addProductToCart (ProductId) {
      const token = localStorage.token
      const CustomerId = localStorage.currentUserId
      if (!localStorage.CartId) {
        server({
          method: 'post',
          url: '/customer/cart',
          headers: {
            token
          },
          data: {
            CustomerId
          }
        })
          .then(response => {
            localStorage.setItem('CartId', response.data.data.id)
            const CartId = localStorage.CartId
            return server({
              method: 'post',
              url: `/customer/${CartId}`,
              headers: {
                token
              },
              data: {
                quantity: 1,
                status: 'Created',
                ProductId
              }
            })
          })
          .then(response => {
            this.$store.dispatch('fetchCustomerCart')
            this.$store.commit('changeCurrentErr', '')
            this.$store.commit('changeCurrentNotif', response.data.notif)
            this.$router.push({ name: 'Cart' })
          })
          .catch(err => {
            this.$store.commit('changeCurrentNotif', '')
            this.$store.commit('changeCurrentErr', err.response.data.err)
          })
      } else {
        const CartId = +localStorage.CartId
        var isAdded = false
        var addedCart = ''
        for (let i = 0; i < this.currentCart.length; i++) {
          if (this.currentCart[i].ProductId === ProductId) {
            isAdded = true
            addedCart = this.currentCart[i]
            break
          }
        }
        if (isAdded) {
          server({
            method: 'put',
            url: `/customer/${CartId}`,
            headers: {
              token
            },
            data: {
              id: addedCart.id,
              ProductId: addedCart.ProductId,
              quantity: Number(addedCart.quantity) + 1,
              status: 'Created'
            }
          })
            .then(response => {
              this.$store.dispatch('fetchCustomerCart')
              this.$store.commit('changeCurrentErr', '')
              this.$store.commit('changeCurrentNotif', response.data.notif)
              this.$router.push({ name: 'Cart' })
            })
            .catch(err => {
              this.$store.commit('changeCurrentNotif', '')
              this.$store.commit('changeCurrentErr', err.response.data.err)
            })
        } else {
          server({
            method: 'post',
            url: `/customer/${CartId}`,
            headers: {
              token
            },
            data: {
              quantity: 1,
              status: 'Created',
              ProductId
            }
          })
            .then(response => {
              this.$store.dispatch('fetchCustomerCart')
              this.$store.commit('changeCurrentErr', '')
              this.$store.commit('changeCurrentNotif', response.data.notif)
              this.$router.push({ name: 'Cart' })
            })
            .catch(err => {
              this.$store.commit('changeCurrentNotif', '')
              this.$store.commit('changeCurrentErr', err.response.data.err)
            })
        }
      }
    }
  },
  created () {
    this.$store.dispatch('fetchCustomerCart')
  },
  mounted () {
    const materialbox = document.querySelectorAll('.materialboxed')
    M.Materialbox.init(materialbox)
  }
}
</script>

<style scoped>
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  #productTitle {
    font-weight: bolder;
    font-size: 16px;
  }
  h6 {
    font-weight: bold;
  }
  .addProductBtn {
    margin-top: 20px;
  }
</style>
