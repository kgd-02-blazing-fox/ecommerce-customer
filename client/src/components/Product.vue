<template>
  <div class="col-sm-3">
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
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  },
  methods: {
    addToCart () {
      console.log('Success Add to cart!')
    }
  }
}
</script>

<style>

</style>
