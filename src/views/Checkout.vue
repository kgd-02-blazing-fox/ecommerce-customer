<template>
  <div id="color" class="container rounded mt-3">
    <div class="pt-3">
      <h1 id="colorhead"> <strong> checkout </strong> </h1>
    </div>
    <div class="px-4 px-lg-0">
    <div class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
          <!-- Shopping cart table -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 bg-spesifikColor">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-spesifikColor">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-spesifikColor">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 bg-spesifikColor">
                    <div class="py-2 text-uppercase">Total</div>
                  </th>
                </tr>
              </thead>
              <tbody>

                <CheckoutList
                v-for="item in items"
                :key="item.id"
                :item="item"
                />

              </tbody>
            </table>
          </div>
          <!-- End -->
        </div>
      </div>

      <CheckoutInfos
      :item="items"
      />

    </div>
  </div>
</div>
  </div>
</template>

<script>
import CheckoutList from '../components/CheckoutList.vue'
import CheckoutInfos from '../components/CheckoutInfos.vue'

export default {
  name: 'checkout',
  components: {
    CheckoutList,
    CheckoutInfos
  },
  created () {
    this.$store.dispatch('getUserCart')
  },
  computed: {
    items () {
      return this.$store.getters.InsideUserCart
    },
    user () {
      return localStorage.getItem('user')
    }
  }
}
</script>

<style scoped>
#color{
  color: #2c3e50;
  background: #eecda3;
  background: -webkit-linear-gradient(to right, #f1c40f, #d35400);
  background: linear-gradient(to right, #e67e22, #f1c40f);
  /* min-height: 100vh; */
}

#colorhead{
  color: #fff
}

.bg-spesifikColor{
  background-color: #2c3e50;
  color: #fff;
}

</style>
