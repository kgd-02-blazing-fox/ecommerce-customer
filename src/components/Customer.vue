<template>
  <div>
    <div class="container">
      <div class="row">
        <div id="customerInfo" class="col s12 m6 push-m3 z-depth-4">
          <h4 class="blue-text text-darken-3">Customer Info</h4>
          <h5 class="left-align">Name</h5>
          <p class="left-align">{{currentCustomer.name}}</p>
          <h5 class="left-align">Address</h5>
          <p class="left-align">{{currentCustomer.address}}</p>
          <h5 class="left-align">Email</h5>
          <p class="left-align">{{currentCustomer.email}}</p>
          <h5 class="left-align">Phone</h5>
          <p class="left-align">{{currentCustomer.phone}}</p>
          <router-link :to="'/customer/edit'"><button class="btn btn-small grey darken-3 z-depth-2">Edit Data</button></router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Customer',
  computed: {
    currentCustomer () {
      return this.$store.state.currentCustomer
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
      this.$store.dispatch('fetchCustomerDetail')
    }
  }
}
</script>

<style scoped>
  h5, h4 {
    font-weight: bolder;
  }
  image {
    height: 200px;
  }
  #customerInfo {
    padding: 20px;
  }
</style>
