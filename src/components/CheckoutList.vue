<template>
  <tr id="coloring">
    <th scope="row" class="border-0">
      <div class="p-2">
        <img class="img-responsive" :src="item.Product.image_url" style="width:25%">
        <div class="ml-3 d-inline-block align-middle">
          <h5 class="mb-0 text-dark d-inline-block align-middle">{{item.Product.name}}</h5>
        </div>
      </div>
    </th>
    <td class="border-0 align-middle"><strong>{{singleProductInRupiah}}</strong></td>
    <td class="border-0 align-middle"><strong>{{item.ammount}}</strong></td>
    <td class="border-0 align-middle"><strong>{{priceInRupiah}}</strong></td>
  </tr>
</template>

<script>
export default {
  name: 'CheckoutList',
  props: ['item'],
  computed: {
    priceInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.item.Product.price * this.item.ammount)
    },
    singleProductInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.item.Product.price)
    }
  }
}
</script>

<style scoped>
#coloring {
  color: #2c3e50;
}

</style>
