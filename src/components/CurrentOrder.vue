<template>
  <div>
    <div v-if="onGoingOrder.length !== 0" class="container">
      <h4 class="blue-text text-darken-3">Current Order</h4>
      <table class="highlight">
        <thead>
          <tr class="largeText">
              <th class="center-align">Product Name</th>
              <th class="center-align">Image</th>
              <th class="center-align">Quantity</th>
              <th class="center-align">Total Price</th>
              <th class="center-align">Order Date</th>
              <th class="center-align">Status</th>
              <th class="center-align">Date Updated</th>
              <th class="center-align">Invoice</th>
          </tr>
        </thead>
        <tbody v-for="product in onGoingOrder" :key="product.id">
          <tr>
            <td class="center-align">{{ product.Product.name }}</td>
            <td class="center">
              <img :src="product.Product.image_url">
            </td>
            <td class="center-align">{{ product.quantity }}</td>
            <td class="center-align">{{ priceConverter(product.Product.price * product.quantity) }}</td>
            <td class="center-align">{{ dateConverter(product.createdAt) }}</td>
            <td class="boldStatus center-align">{{ product.status.toUpperCase() }}</td>
            <td class="center-align">{{ dateConverter(product.updatedAt) }}</td>
            <td class="center-align">
              <router-link :to="`/my_order/${product.id}`">Invoice</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import priceConverter from '../helpers/priceConverter'
import dateConverter from '../helpers/dateConverter'

export default {
  name: 'CurrentOrder',
  computed: {
    customerCart () {
      return this.$store.state.customerCart
    },
    onGoingOrder () {
      var detail = []
      for (let i = 0; i < this.customerCart.length; i++) {
        if (this.customerCart[i].status === 'Paid' || this.customerCart[i].status === 'On Process' || this.customerCart[i].status === 'Shipping') {
          detail.push(this.customerCart[i])
        }
      }
      return detail
    }
  },
  methods: {
    priceConverter: priceConverter,
    dateConverter: dateConverter
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
      this.$store.dispatch('fetchCustomerCart')
    }
  }
}
</script>

<style scoped>
  img {
    height: 100px;
  }
  .boldStatus {
    font-weight: bold;
    color: green;
  }
  /* .largeText {
    font-size: 16px;
  } */
</style>
