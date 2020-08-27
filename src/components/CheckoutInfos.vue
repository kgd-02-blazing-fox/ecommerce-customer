<template>
  <div class="row py-5 p-4 bg-white rounded shadow-sm">
    <div class="col-lg-6">
      <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
      <div class="p-4">
        <p class="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
        <div class="input-group mb-4 border rounded-pill p-2">
          <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" class="form-control border-0">
          <div class="input-group-append border-0">
            <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply coupon</button>
          </div>
        </div>
      </div>
      <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">payment method</div>
      <div class="p-4">
        <!-- <p class="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p> -->
          <div class="row">
          <div class="col">
            <i class="fab fa-cc-visa fa-5x"></i>
            <input class="radio-inline" type="radio" name="optradio" checked>
          </div>
          <div class="col">
            <i class="fab fa-cc-paypal fa-5x"></i>
            <input class="radio-inline" type="radio" name="optradio">
          </div>
          <div class="col">
            <i class="fas fa-credit-card fa-5x"></i>
            <input class="radio-inline" type="radio" name="optradio">
          </div>
          </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
      <div class="p-4">
        <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
        <ul class="list-unstyled mb-4">
          <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>{{totalProductInRupiah}}</strong></li>
          <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>free</strong></li>
          <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>{{taxInRupiah}}</strong></li>
          <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">total</strong>
            <h5 class="font-weight-bold">{{total}}</h5>
          </li>
        </ul><a @click.prevent="checkout" class="btn btn-dark rounded-pill py-2 btn-block hovers">finish checkout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutInfos',
  data () {
    return {
      // datas: []
    }
  },
  props: ['item'],
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
      this.$store.dispatch('stockUpdate', this.items)
    }
  },
  created () {
    this.$store.dispatch('getUserCart')
  },
  computed: {
    items () {
      const datas = []
      this.$store.getters.InsideUserCart.forEach(el => {
        return datas.push({
          id: el.Product.id,
          ammount: el.ammount
        })
      })
      return datas
    },
    subtotal () {
      let total = 0
      this.item.forEach(el => {
        total += (el.ammount * el.Product.price)
      })
      return total
    },
    totalProductInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.subtotal)
    },
    taxInRupiah () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.subtotal * 10 / 100)
    },
    total () {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.subtotal + (this.subtotal * 10 / 100))
    }
  }
}
</script>

<style scoped>
.hovers{
  cursor: pointer;
}
</style>
