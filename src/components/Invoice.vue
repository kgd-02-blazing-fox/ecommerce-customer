<template>
  <div class="container">
    <h4 class="center blue-text">Invoice ID:{{order.id}}</h4>
    <div class="row">
      <div class="col s12 m6">
        <h5 class="left-align">Product</h5>
        <p class="left-align">{{ order.Product.name }}</p>
        <h5 class="left-align">Quantity</h5>
        <p class="left-align">{{ order.quantity}}</p>
        <h5 class="left-align">Status</h5>
        <p class="left-align">{{ order.status }}</p>
        <p class="left-align">Updated at: {{ dateConverter(order.updatedAt) }}</p>
        <h5 class="left-align">Total Paid</h5>
        <p class="left-align">{{ priceConverter(order.Product.price * order.quantity) }}</p>
        <h5 class="left-align">Order Date</h5>
        <p class="left-align">{{ dateConverter(order.createdAt) }}</p>
      </div>
      <div class="col s12 m6">
        <h5 class="center">Product Image</h5>
        <div class="col s12 m4 push-m4">
          <img :src="order.Product.image_url" class="materialboxed center">
        </div>
        <p>=====================================================</p>
        <h5 class="center">Customer Detail</h5>
        <h6 class="left-align">Name</h6>
        <p class="left-align">{{ order.Cart.Customer.name }}</p>
        <h6 class="left-align">Email</h6>
        <p class="left-align">{{ order.Cart.Customer.email }}</p>
        <h6 class="left-align">Phone</h6>
        <p class="left-align">{{ order.Cart.Customer.phone }}</p>
        <h6 class="left-align">Address</h6>
        <p class="left-align">{{ order.Cart.Customer.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import priceConverter from '../helpers/priceConverter'
import dateConverter from '../helpers/dateConverter'
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'Invoice',
  computed: {
    order () {
      const orders = this.$store.state.customerCart
      const id = this.$route.params.id
      var detail = {}
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === +id) {
          detail = orders[i]
          break
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
  },
  mounted () {
    const materialbox = document.querySelectorAll('.materialboxed')
    M.Materialbox.init(materialbox)
  }
}
</script>

<style scoped>
  h4, h5, h6 {
    font-weight: bolder;
  }
  img {
    height: 100px
  }
</style>
