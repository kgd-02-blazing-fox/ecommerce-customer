<template>
  <tr>
    <td>{{ cart.Product.name }}</td>
    <td>{{ cart.quantity }}</td>
    <td>Rp. {{ cart.Product.price }}</td>
    <td>Rp. {{ cart.Product.price*cart.quantity }}</td>
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
