<template>
  <div class="col-sm-3">
    <div class="card h-100 text-left" style="padding: 15px 10px; background-color:#ccc;">
      <img :src="cart.Product.image_url" alt="">
      <div>
        <h5 class="card-title">
          {{ cart.Product.name }}
        </h5>
      </div>
      <div class="row">
        <div class="col-6">
          <p style="font-weight:bold; color:tomato">Special Prize</p>
          <p style="font-size:14px; text-decoration:line-through">Rp. {{ cart.Product.price }}</p>
          <p style="font-size:22px; margin-left:10px;">
            <strong style="color:green;">Rp. {{ cart.Product.price-(cart.Product.price*20/100) }}</strong>
          </p>
        </div>
        <div class="col-6">
          <div class="row justify-content-center" style="margin-top:10px;">
            <button @click.prevent="minCart" class="btn btn-primary">-</button>
            <div class="col-4" style="background-color:white; font-weight:bold; text-align:center; padding:10px" >
              {{ cart.quantity }}
            </div>
            <button @click.prevent="addToCart" class="btn btn-primary">+</button>
          </div>
        </div>
      </div>
      <button @click.prevent="removeFromCart" class="btn btn-danger" style="margin-top:20px">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductChart',
  props: {
    cart: Object
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', {
        quantity: 1,
        ProductId: this.cart.ProductId
      })
      this.$store.dispatch('fetchCharts')
    },
    minCart () {
      this.$store.dispatch('minCart', {
        ProductId: this.cart.ProductId
      })
      this.$store.dispatch('fetchCharts')
    },
    removeFromCart () {
      this.$store.dispatch('removeFromCart', {
        ProductId: this.cart.ProductId
      })
    }
  }

}
</script>

<style>
p{
  line-height: 5px;
}
</style>
