<template>
  <tbody>
    <tr>
      <th scope="row" class="border-0">
        <div class="">
          <img class="img-responsive" :src="item.Product.image_url" style="width:15%">
          <div class="ml-3 d-inline-block align-middle">
            <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">{{item.Product.name}}</a></h5>
          </div>
        </div>
      </th>
      <td class="border-0 align-middle"><strong>{{priceInRupiah}}</strong></td>
      <td class="border-0 align-middle"><strong>{{item.ammount}}</strong></td>
      <td class="border-0 align-middle">
        <div class="col">
          <div class="col">
            <a @click="deleteItem(item.ProductId)" class="text-dark"><i class="fa fa-trash"></i> remove</a>
          </div>
          <div class="col">
            <div class="col">
              <a @click="increase(item.ProductId)" class="text-dark"><i class="fas fa-plus-square"></i></a> |
              <a @click="decrease(item.ProductId)" class="text-dark"><i class="fas fa-minus-square"></i></a>
            </div>
          </div>
        </div>
        </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'CartItems',
  props: ['item'],
  methods: {
    deleteItem (id) {
      this.$store.dispatch('destryoItemFromCart', id)
    },
    increase (id) {
      this.$store.dispatch('addItemQuantityInCart', id)
    },
    decrease (id) {
      this.$store.dispatch('reduceItemQuantityInCart', id)
    }
  },
  computed: {
    priceInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.item.Product.price * this.item.ammount)
    }
  }
}
</script>

<style>

</style>
