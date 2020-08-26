<template>
  <div class="">
  <b-navbar toggleable="lg" type="dark">
    <b-navbar-brand class=""><b>
      <i class="fas fa-store-alt"></i> foxshop
    </b></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <div id="nav">
          <router-link to="/">products</router-link> |
          <router-link to="/about"> <i class="fas fa-shopping-cart"></i> your cart</router-link>
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
            <b-dropdown-item href="#">foxPay : 0 </b-dropdown-item>
            <b-dropdown-item @click.prevent="logout">LOG OUT</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-navbar-nav v-if="!isLogin" right>
            <div id="nav">
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

</style>
