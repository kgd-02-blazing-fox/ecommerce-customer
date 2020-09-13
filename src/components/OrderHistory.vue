<template>
  <div>
    <div v-if="finishedOrder.length !== 0" class="container">
      <h4>Order History</h4>
      <table class="highlight">
        <thead>
          <tr>
              <th class="center-align">Product Name</th>
              <th class="center-align">Product Img</th>
              <th class="center-align">Quantity</th>
              <th class="center-align">Price per Product</th>
              <th class="center-align">Total Price</th>
              <th class="center-align">Status</th>
              <th class="center-align">Finished Date</th>
              <th class="center-align">Invoice</th>
          </tr>
        </thead>
        <tbody v-for="product in finishedOrder" :key="product.id">
          <tr>
            <td class="center-align">{{ product.Product.name }}</td>
            <td class="center">
              <img :src="product.Product.image_url">
            </td>
            <td class="center-align">{{ product.quantity }}</td>
            <td class="center-align">{{ priceConverter(product.Product.price) }}</td>
            <td class="center-align">{{ priceConverter(product.Product.price * product.quantity) }}</td>
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
  name: 'OrderHistory',
  computed: {
    customerCart () {
      return this.$store.state.customerCart
    },
    finishedOrder () {
      var detail = []
      for (let i = 0; i < this.customerCart.length; i++) {
        if (this.customerCart[i].status === 'Finish') {
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
</style>
