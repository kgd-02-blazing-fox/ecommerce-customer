<template>
  <div class="border w-100" style="max-height: 50px" @click.prevent="goToDetail">
      <img
        :src="cart.Product.image_url"
        alt="No image Preview"
        class="float-left"
        style="max-height: 50px; max-width: 50px; object-fit: cover;"
      />
      <div class="card-body text-right pt-0 mt-2">
        <span class="card-title float-right" style="font-size: 0.8em;">{{cart.amount}} pcs</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MiniCheckoutCard',
  props: ['cart'],
  methods: {
    goToDetail () {
      this.$router.push(`/iteminfo/${this.cart.Product.id}`)
    }
  }
}
</script>

<style>
</style>
