<template>
  <!-- main body -->
  <div class="container mt-3">
    <!-- sub nav -->
    <div class="row border px-2 bg-light justify-content-between py-auto" style="border-radius: 15px;">
        <div class="d-inline d-lg-none d-xl-none">
          <input type="text" id="search-sm" class="bg-light rounded d-inline" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" placeholder="Search.."> on
          <select id="search-sm" class="d-inline bg-transparent" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);">
            <option value="">None</option>
          </select> <br>
        </div>
        <div class="d-none d-lg-block d-xl-block">
        </div>
        <div class="btn-group" data-toggle="buttons">
          <!-- subnav button - visible on smaller size -->
          <label class="btn btn-light btn-sm my-auto">
            <input type="button" name="button" style="display: none;" ><i class="fas fa-store-alt" style="color:rgb(165, 82, 243)"></i>
            <span class="d-none d-md-inline d-lg-inline d-xl-inline"> Home</span>
          </label>
          <label class="btn btn-light btn-sm my-auto ">
            <input type="button" name="button" style="display: none;" ><i class="fas fa-shopping-cart" style="color:rgb(165, 82, 243)"></i>
            <span class="d-none d-md-inline d-lg-inline d-xl-inline" @click.prevent="toCheckout"> Checkout</span>
          </label>
          <label class="btn btn-light btn-sm my-auto border-right">
            <input type="button" name="button" style="display: none;" ><i class="fas fa-history" style="color:rgb(165, 82, 243)"></i>
            <span class="d-none d-md-inline d-lg-inline d-xl-inline"> Purchase History</span>
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
        <label for="search">Search:</label> <br>
        <input type="text" name="" id="search-lg" class="w-100" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" placeholder="Insert item name here..">
        <br>
        <br>
        <label for="filter">Filter by Category:</label> <br>
        <select name="" id="filter-lg" class="w-100" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);">
          <option value="">None</option>
        </select> <br>
        <!-- Carts -->
        <div class="container-fluid">
          <br>
          <h4 class="text-left">Your Cart:</h4>
            <div class="row" style="max-height: 45vh; overflow-y: auto;">
              <!-- Cards -->
              <div class="col-12 p-0 m-0 h-100 text-center" style="color: grey;">
                <h5>You do not have any yet!</h5>
              </div>
              <!-- <div class="col-3 p-0 m-0 h-100">
                <img
                src="https://d2pa5gi5n2e1an.cloudfront.net/webp/service/id/images/mens-fashion/price/11022/11022450/MF_kaos_eiger_sketch_geometri_910004899_1.jpg"
                alt="No image Preview" style="max-height: 50px; object-fit: cover;">
              </div>
              <div class="col-9 p-0 m-0 h-100 d-inline">
                <label class="btn btn-white btn-sm float-right ">
                  <input type="button" name="button" style="display: none;" ><i class="fas fa-heart-broken" style="color:red"></i>
                </label>
                <div class="card-body text-left pt-0 mt-2">
                  <span class="card-title" style="font-size: 0.8em;">Kaos Eiger</span>
                </div>
              </div>
              <div class="col-3 p-0 m-0 h-100">
                <img
                src="https://d2pa5gi5n2e1an.cloudfront.net/webp/service/id/images/mens-fashion/price/11022/11022450/MF_kaos_eiger_sketch_geometri_910004899_1.jpg"
                alt="No image Preview" style="max-height: 50px; object-fit: cover;">
              </div>
              <div class="col-9 p-0 m-0 h-100 d-inline">
                <label class="btn btn-white btn-sm float-right ">
                  <input type="button" name="button" style="display: none;" ><i class="fas fa-heart-broken" style="color:red"></i>
                </label>
                <div class="card-body text-left pt-0 mt-2">
                  <span class="card-title" style="font-size: 0.8em;">Kaos Eiger</span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      <!-- right container -->
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12 overflow"
        style="height: 80vh;min-width: 50%; overflow-y: auto;">
        <div class="row">
          <div class="container-fluid" v-if="!gridView">
            <CardV
             v-for="(item,index) in products"
             :key="index"
             :product = item
            />
          </div>
          <!-- <div class="container-fluid" v-else>
            <CardH
             v-for="(item,index) in products"
             :key="index"
             :products = item
             class="m-0"
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CardH from '../components/CardH.vue'
import CardV from '../components/CardV.vue'
export default {
  name: 'Home',
  data () {
    return {
      gridView: false
    }
  },
  mounted () {
    this.$store.commit('SET_LOGGED')
    this.$store.dispatch('fetch')
  },
  methods: {
    grid () {
      this.gridView = true
      this.gridView = false
    },
    list () {
      this.gridView = false
    },
    toCheckout () {
      this.$router.push('/checkout')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    carts () {
      return this.$store.state.carts
    }
  },
  components: {
    // CardH,
    CardV
  }
}
</script>

<style>

</style>
