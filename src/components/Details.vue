<template>
  <div class="container d-flex justify-content-center mt-5">
    <b-card no-body class="col-8 overflow-hidden">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="product.image_url" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="product.name">
              <b-card-text>
                  <h1>price : {{priceInRupiah}}</h1>
                </b-card-text>

                <!-- <b-card-text>{{product}}</b-card-text> -->
                <form>
                  <div>
                    <label for="range-1">maximum 5 item for each transaction</label>
                    <b-form-input id="range-1" v-model="quantity" type="range" min="1" max="5"></b-form-input>
                  </div>
                </form>
                <div class="hovers">
                <a @click.prevent="addNewToCart(product.id)" class="card-link"> <i class="fas fa-check-square"></i> add {{ quantity }} to cart</a>
                <b-link @click.prevent="back" class="card-link"><i class="fas fa-undo-alt"></i> another product</b-link>
                </div>

          </b-card-body>
        </b-col>
      </b-row>
      <template v-slot:footer>
        <em> <b> item stock :</b> {{product.stock}}</em>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data () {
    return {
      quantity: 1
    }
  },
  created () {
    this.$store.dispatch('fetchProductsSpesific', Number(this.$route.params.productId))
  },
  methods: {
    addNewToCart (id) {
      const payload = {
        id,
        quantity: Number(this.quantity)
      }
      if (localStorage.getItem('access_token')) {
        this.$store.dispatch('addToCart', payload)
      } else {
        this.$store.commit('ALERT', 'please login first')
      }
    },
    back () {
      this.$router.push('/')
    }
  },
  computed: {
    product () {
      return this.$store.getters.spesificProduct
    },
    priceInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.product.price)
    }
  }
}
</script>

<style scoped>
.hovers{
  cursor: pointer;
}
</style>
