<template>
  <tr>
    <td>{{ cart.Product.name }}</td>
    <td>{{ cart.quantity }}</td>
    <td>Rp. {{ cart.Product.price-(cart.Product.price*20/100) }}</td>
    <td>Rp. {{ (cart.Product.price-(cart.Product.price*20/100))*cart.quantity }}</td>
  </tr>
</template>

<script>
export default {
  name: 'Chart',
  props: {
    cart: Object
  }
}
</script>

<style>

</style>
