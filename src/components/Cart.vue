<template>
  <div id="cartpos" class="container mt-3 border rounded shadow">
    <div class="row">
      <div class="col" >
        <div class="mt-2">
        <div @click.prevent="closeCart" class="row d-flex flex-row-reverse mr-1 hovers">
          <i class="fas fa-window-close fa-lg"></i>
        </div>
        <h3><i class="fas fa-shopping-cart"></i> {{user}} shooping cart </h3>
        </div>
        <!-- {{items}} -->
        <div class="table-responsive">
            <table class="table">
              <thead class="colorThis">
                <tr>
                  <th scope="col" class="border-0 colorThis">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 colorThis">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 colorThis">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 colorThis">
                    <div class="py-2 text-uppercase">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="items.length === 0">
                <div class="container-fluid d-flex justify-content-center">
                  <h3>it is empty.. lets start shopping :)</h3>
                </div>
              </tbody>
              <CartItems
              id="spesifik"
              v-for="item in items"
              :key="item.id"
              :item="item"
              />
            </table>
          </div>
          <div class="row">
            <div class="col">
              <b-link id="khusus" @click.prevent="closeCart"> <h3> <i class="fas fa-undo-alt"></i> continue shopping </h3> </b-link>
            </div>
            <div class="col" v-if="items.length !== 0" >
              <router-link id="khusus" to="/checkout"> <h3> <i class="fas fa-cash-register"></i> checkout </h3> </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItems from '@/components/CartItems'

export default {
  name: 'Cart',
  components: {
    CartItems
  },
  methods: {
    closeCart () {
      this.$emit('closeCart')
    }
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
#cartpos{
  background: -webkit-linear-gradient(to right, #f1c40f, #d35400);
  background: linear-gradient(to right, #e67e22, #f1c40f);
  z-index: 1;
  position: absolute;
  overflow: auto;
  height: 80vh;
}

#colors{
  background: -webkit-linear-gradient(to right, #f1c40f, #d35400);
  background: linear-gradient(to right, #e67e22, #f1c40f);
}

#spesifik{
  background-color: white;
}

.colorThis{
  color: #ecf0f1;
  background-color: #2c3e50;
}

#khusus{
  color: #2c3e50;
  text-decoration: none;
}

.hovers{
  cursor: pointer;
}
</style>
