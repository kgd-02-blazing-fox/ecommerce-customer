<template>
  <!-- main body -->
  <div class="container mt-3">
    <!-- sub nav -->
    <div class="row border px-2 bg-light justify-content-between py-auto" style="border-radius: 15px;">
        <div class="d-inline d-lg-none d-xl-none">
          <input type="text" id="search-sm" class="bg-light rounded d-inline" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" placeholder="Search.." v-model="nameFilter"> on
          <select id="search-sm" class="d-inline bg-transparent" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" v-model="categoryFilter">
            <option value="">None</option>
          <option
            v-for="(product,i) in productCategoryOnly"
            :key="i"
            :value="product">{{product}}</option>
          </select> <br>
        </div>
        <div class="d-none d-lg-block d-xl-block">
        </div>
        <div class="btn-group" data-toggle="buttons">
          <!-- subnav button - visible on smaller size -->
          <label class="btn btn-light btn-sm my-auto">
            <input type="button" name="button" style="display: none;" ><i class="fas fa-store-alt" style="color:rgb(165, 82, 243)"></i>
            <span class="d-none d-md-inline d-lg-inline d-xl-inline" @click.prevent="toHome"> Home</span>
          </label>
          <label class="btn btn-light btn-sm my-auto ">
            <input type="button" name="button" style="display: none;" ><i class="fas fa-shopping-cart" style="color:rgb(165, 82, 243)"></i>
            <span class="d-none d-md-inline d-lg-inline d-xl-inline" @click.prevent="toCheckout"> Checkout</span>
          </label>
          <label class="btn btn-light btn-sm my-auto border-right">
            <input type="button" name="button" style="display: none;" ><i class="fas fa-history" style="color:rgb(165, 82, 243)"></i>
            <span class="d-none d-md-inline d-lg-inline d-xl-inline" @click.prevent="toHistory"> Purchase History</span>
          </label>
          <!-- subnav button - visible on any size -->
          <label class="btn btn-light btn-sm my-auto border-left">
            <input type="button" name="button" id="option1"  style="display: none;" @click.prevent="grid"><i class="fas fa-th-large" style="color:rgb(165, 82, 243)"></i>
          </label>
          <label class="btn btn-light btn-sm my-auto">
            <input type="button" name="button" id="option2" style="display: none;" @click.prevent="list"><i class="fas fa-list" style="color:rgb(165, 82, 243)"></i>
          </label>
        </div>
    </div>
    <!-- main catalog -->
    <div class="row mt-3">
      <!-- left container -->
      <div class="col-xl-3 col-lg-3 col-md-3 d-none d-lg-block d-xl-block border-right p-4 text-right" style="min-height: 15vh;">
        <!-- filter -->
        <h4 class="text-left">Welcome{{name}}!</h4>
        <label for="search">Search:</label> <br>
        <input type="text" name="" id="search-lg" class="w-100" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" placeholder="Insert item name here.." v-model="nameFilter">
        <br>
        <br>
        <label for="filter">Filter by Category:</label> <br>
        <select name="" id="filter-lg" class="w-100" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" v-model="categoryFilter">
          <option value="">None</option>
          <option
            v-for="(product,i) in productCategoryOnly"
            :key="i"
            :value="product">{{product}}</option>
        </select> <br>
        <!-- Carts -->
        <div class="container-fluid">
          <br>
          <h4 class="text-left">Your Cart:</h4>
            <div class="row" style="max-height: 45vh; overflow-y: auto;">
              <!-- Cards -->
              <div class="col-12 p-0 m-0 h-100 text-center" style="color: grey;" v-if="!isLogged">
                <h5>Login to start adding cart!</h5>
              </div>
              <div class="col-12 p-0 m-0 h-100 text-center" style="color: grey;" v-else-if="!carts.length">
                <h5>You do not have any yet!</h5>
              </div>
                <MiniCheckoutCard
                  v-for="(cart,i) in carts"
                  :key="i"
                  :cart="cart"
                />
        </div>
        </div>
        </div>
      <!-- right container -->
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 overflow"
        style="height: 80vh;min-width: 50%; overflow-y: auto;">
        <div class="row">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniCheckoutCard from '../components/MiniCheckoutCard.vue'
export default {
  name: 'Home',
  data () {
    return {
      gridView: false,
      nameFilter: '',
      categoryFilter: ''
    }
  },
  created () {
    this.$store.commit('SET_LOGGED')
    this.$store.dispatch('fetch')
      .catch(err => console.log(err.response.data))
  },
  methods: {
    grid () {
      this.$store.commit('SET_VIEW', true)
      this.$router.push('/')
    },
    list () {
      this.$store.commit('SET_VIEW', false)
      this.$router.push('/')
    },
    toCheckout () {
      this.$router.push('/checkout')
    },
    toHome () {
      this.$router.push('/')
    },
    toHistory () {
      this.$router.push('/history')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    productCategoryOnly () {
      const arr = []
      this.$store.state.products.forEach(el => {
        let duplicate = false
        arr.forEach(elAr => {
          if (el.category === elAr) duplicate = true
        })
        if (!duplicate) arr.push(el.category)
      })
      return arr
    },
    carts () {
      return this.$store.state.cart.filter(el => { return el.history === false })
    },
    name () {
      if (!this.$store.state.isLogged) return ' Guest'
      else return ''
    },
    isLogged () {
      return this.$store.state.isLogged
    }
  },
  watch: {
    gridView: function (newState, oldState) {
      this.$store.commit('SET_VIEW', newState)
    },
    nameFilter: function (newState, oldState) {
      if (this.$route.name !== '/') this.$router.push('/')
      this.$store.commit('SET_NAME', newState)
    },
    categoryFilter: function (newState, oldState) {
      if (this.$route.name !== '/') this.$router.push('/')
      this.$store.commit('SET_CATEGORY', newState)
    }
  },
  components: {
    MiniCheckoutCard
  }
}
</script>

<style>

</style>
