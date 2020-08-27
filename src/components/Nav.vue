<template>
  <div class="">
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand class=""><b>
      <i class="fas fa-store-alt"></i> foxshop
    </b></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <div id="nav" class="row ml-3 hovers">
          <div class="mr-2" @click="closeCart">
          <router-link to="/">products</router-link>
          </div>
          <div class="ml-2">
          <b id="nav" @click="openCart"> <i class="fas fa-shopping-cart"></i> your cart</b>
          </div>
        </div>
        <!-- <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

          <b-nav-item-dropdown v-if="isLogin" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>
                <i class="fas fa-user"></i> Welcome <b> {{user}} </b>
              </em>
            </template>
            <b-dropdown-item href="#"> <i class="fas fa-money-bill-wave-alt hovers"></i> <b> foxPay </b> : 0 </b-dropdown-item>
            <b-dropdown-item @click.prevent="logout"><i class="fas fa-sign-out-alt hovers"></i> LOG OUT</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-navbar-nav v-if="!isLogin" right>
            <div id="nav" class="hovers">
              <router-link to="/login">
              LOGIN <i class="fas fa-sign-in-alt"></i></router-link>
            </div>
          </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      isLogin: localStorage.getItem('access_token')
    }
  },
  methods: {
    logout () {
      this.isLogin = false
      this.$store.dispatch('logout')
    },
    openCart () {
      if (localStorage.getItem('access_token')) {
        this.$emit('openCart')
      } else {
        this.$store.commit('ALERT', 'please login first')
      }
    },
    closeCart () {
      this.$emit('closeCart')
    }
  },
  computed: {
    user () {
      return localStorage.getItem('user')
    }
  }
}
</script>

<style scoped>
.hovers{
  cursor: pointer;
}
</style>
