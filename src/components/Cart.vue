<template>
  <div>
    <Navbar></Navbar>
    <NotifSection></NotifSection>
    <ErrorSection></ErrorSection>
    <div v-if="currentCart.length == 0">
      <img src="https://image.flaticon.com/icons/svg/102/102661.svg">
      <h5>Cart is empty. Please shop first!</h5>
      <router-link :to="'/dashboard'"><button class="btn btn-large white grey-text text-darken-3 z-depth-3">START SHOPPING!</button></router-link>
    </div>
    <div v-else-if="currentCart.length !== 0" class="container">
      <router-link :to="'/dashboard'"><button id="shopmoreBtn" class="boldText btn btn-large red white-text z-depth-2">SHOP MORE!</button></router-link>
      <table class="highlight">
        <thead>
          <tr>
              <th class="center-align">Product Name</th>
              <th class="center-align">Product Img</th>
              <th class="center-align">Quantity</th>
              <th class="center-align">Price per Product</th>
              <th class="center-align">Total Price</th>
              <th class="center-align">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in currentCart" :key="product.id">
            <td class="center-align">{{ product.Product.name }}</td>
            <td class="center">
              <img :src="product.Product.image_url">
            </td>
            <td class="center">
              <div class="row">
                <div class="col m4">
                  <button v-if="product.quantity > 1" class="btn btn-small" @click.prevent="changeQuantity(product,-1)"><i class="material-icons">remove</i></button>
                </div>
                <div class="col m4">
                  <h6>{{ product.quantity }}</h6>
                </div>
                <div class="col m4">
                  <button class="btn btn-small" @click.prevent="changeQuantity(product,+1)"><i class="material-icons">add</i></button>
                </div>
              </div>
            </td>
            <td class="center-align">{{ priceConverter(product.Product.price) }}</td>
            <td class="center-align">{{ priceConverter(product.Product.price * product.quantity) }}</td>
            <td class="center"><button class="btn btn-small" @click.prevent="deleteProductFromCart(product.id)"><i class="material-icons">delete</i></button></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="boldText center-align">TOTAL PRICE</td>
            <td></td>
            <td class="boldText center-align green-text text-darken-2">{{ priceConverter(TotalPrice) }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button class="checkoutBtn btn btn-large z-depth-4" @click.prevent="checkoutAndPay"><i class="material-icons right">payment</i>Checkout and Pay</button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import server from '../api/index'
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'
import priceConverter from '../helpers/priceConverter'

export default {
  name: 'Cart',
  components: {
    Navbar, NotifSection, ErrorSection
  },
  computed: {
    currentCart () {
      return this.$store.state.currentCart
    },
    TotalPrice () {
      let totalPrice = 0
      for (let i = 0; i < this.currentCart.length; i++) {
        totalPrice += this.currentCart[i].quantity * this.currentCart[i].Product.price
      }
      return totalPrice
    }
  },
  methods: {
    priceConverter: priceConverter,
    deleteProductFromCart (CartProductId) {
      const CartId = localStorage.CartId
      const token = localStorage.token
      server({
        method: 'delete',
        url: `/customer/${CartId}/${CartProductId}`,
        headers: {
          token
        }
      })
        .then(response => {
          this.$store.dispatch('fetchCustomerCart')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    },
    changeQuantity (cartProduct, sum) {
      const token = localStorage.token
      server({
        method: 'put',
        url: `/customer/${cartProduct.CartId}`,
        headers: {
          token
        },
        data: {
          id: cartProduct.id,
          ProductId: cartProduct.ProductId,
          quantity: Number(cartProduct.quantity) + sum,
          status: 'Created'
        }
      })
        .then(response => {
          this.$store.dispatch('fetchCustomerCart')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    },
    checkoutAndPay () {
      const CartId = localStorage.CartId
      const token = localStorage.token
      var notif = []
      var error = []
      var promises = []
      for (let i = 0; i < this.currentCart.length; i++) {
        promises.push(server({
          method: 'patch',
          url: `/product/${this.currentCart[i].ProductId}`,
          data: {
            stock: Number(this.currentCart[i].Product.stock) - Number(this.currentCart[i].quantity),
            email: this.$store.state.currentCustomer.email
          }
        })
          .then(response => {
            notif.push(response.data.notif)
          })
          .catch(err => {
            error.push(err)
          })
        )
      }
      Promise.all(promises)
        .then(() => {
          this.$store.dispatch('fetchProductsList')
          return server({
            method: 'patch',
            url: `/customer/${CartId}`,
            headers: {
              token
            },
            data: {
              status: 'Paid'
            }
          })
        })
        .then(response => {
          localStorage.removeItem('CartId')
          this.$store.dispatch('fetchCustomerCart')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', 'Order success!')
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
      this.$store.dispatch('fetchCustomerCart')
      this.$store.dispatch('fetchCustomerDetail')
    }
  }
}
</script>

<style scoped>
  img {
    height: 100px;
  }
  .checkoutBtn {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .boldText {
    font-weight: bolder;
  }
</style>
