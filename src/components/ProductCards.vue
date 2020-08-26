<template>
  <div @click.prevent="details(item.id)" class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
    <b-card
      :title="item.name"
      :img-src="item.image_url"
      img-top
      tag="article"
      class="mb-1"
    >
      <b-card-text>
        <div class="row">
          <div class="col d-flex flex-row-reverse"><b>Price : </b></div>
          <div class="col d-flex flex-row">{{priceInRupiah}}</div>
        </div>
      </b-card-text>

      <b><i class="fas fa-cart-plus fa-lg"></i> add to cart</b>
      <template v-slot:footer>
        <em><b>Stock left : </b> {{item.stock}} </em>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ProductCards',
  props: ['item'],
  methods: {
    details (id) {
      this.$router.push('/details/' + id)
    }
  },
  computed: {
    priceInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.item.price)
    }
  }
}
</script>

<style scoped>
#setWidth {
  width: 100% !important;
}
</style>
