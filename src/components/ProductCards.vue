<template>
  <div class="col">
    <b-card
      :title="item.name"
      :img-src="item.image_url"
      img-top
      tag="article"
      class="mb-2"
    >
      <b-card-text>
        <p><b>Price :</b> {{item.price}}</p>
        <p><b>Stock :</b> {{item.stock}}</p>
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ProductCards',
  props: ['item']
}
</script>

<style>

</style>
