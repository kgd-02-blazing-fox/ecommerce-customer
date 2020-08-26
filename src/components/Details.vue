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

                <a href="#" class="card-link">add to cart</a>
                <b-link href="#" class="card-link">another product</b-link>

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
  created () {
    this.$store.dispatch('fetchProductsSpesific', Number(this.$route.params.productId))
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

<style>

</style>
