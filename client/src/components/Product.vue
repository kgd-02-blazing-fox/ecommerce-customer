<template>
  <div class="col-sm-3">
    <div class="card h-100 text-left" style="padding: 15px 10px; background-color:#ccc;">
      <img :src="product.image_url" alt="">
      <div>
        <h5 class="card-title">
          {{ product.name }}
        </h5>
      </div>
      <div class="row">
        <div class="col-6">
          <p style="font-weight:bold; color:tomato">Special Prize</p>
          <p style="font-size:14px; text-decoration:line-through">Rp. {{ product.price }}</p>
          <p style="font-size:22px; margin-left:10px;">
            <strong style="color:green;">Rp. {{ product.price-(product.price*20/100) }}</strong>
          </p>
        </div>
        <div class="col-6">
          <div class="row justify-content-center" style="margin-top:10px;">
            <div class="col-4" style="background-color:white; font-weight:bold; text-align:center; padding:10px" >
              Stock {{ product.stock }}
            </div>
          </div>
        </div>
      </div>
      <button @click="addToCart" class="btn btn-primary" style="margin-top:20px">Add to chart</button>
    </div>
  </div>
  <!-- <div class="col-sm-3">
    <div class="card h-100 text-left" style="padding: 15px 10px; background-color:#ccc;">
      <img :src="product.image_url" alt="">
      <div>
        <h4 class="card-title">
          {{ product.name }}
        </h4>
        <strong>Rp. {{ product.price }}</strong>
      </div>
      <button @click="addToCart" class="btn btn-primary" style="margin-top:20px">Add to chart</button>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  },
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', {
        quantity: 1,
        ProductId: this.product.id
      })
    }
  }
}
</script>

<style>

</style>
