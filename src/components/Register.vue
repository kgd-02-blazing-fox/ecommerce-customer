<template>
  <div id="registerForm" class="container">
    <div class="row">
      <div class="col s12 m6 push-m3">
        <h4 class="center grey-text text-darken-4">Welcome to Digi-One</h4>
        <h6 class="center grey-text text-darken-4">Please register first</h6>
        <NotifSection></NotifSection>
        <ErrorSection></ErrorSection>
        <div class="input-field">
          <input id="newName" v-model="newCustomer.name" type="text" class="validate" required>
          <label for="newName">Name</label>
        </div>
        <div class="input-field">
          <input id="newAddress" v-model="newCustomer.address" type="text" class="validate" required>
          <label for="newAddress">Address</label>
        </div>
        <div class="input-field">
          <input id="newPhone" v-model="newCustomer.phone" type="number" class="validate" required>
          <label for="newPhone">Phone</label>
        </div>
        <div class="input-field">
          <input id="newEmail" v-model="newCustomer.email" type="email" class="validate" required>
          <label for="newEmail">Email</label>
        </div>
        <div class="input-field">
          <input id="newPassword" v-model="newCustomer.password" type="password" class="validate" required>
          <label for="newPassword">Password</label>
        </div>
        <div class="row">
          <div class="col m3 push-m3">
            <button type="submit" class="btn grey darken-4 z-depth-3" @click.prevent="registerCustomer">Register</button>
          </div>
          <div class="col m3 push-m3">
            <router-link :to="'/'"><button class="btn red darken-1 z-depth-3">Cancel</button></router-link>
          </div>
        </div>
        <div class="row">
          <div class="col m4 push-m4">
            <p>Digi-One member?</p>
            <router-link :to="'/login'"><button class="btn btn-small grey darken-4 z-depth-3">Login</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from '../api/index'
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'Register',
  components: {
    NotifSection, ErrorSection
  },
  data () {
    return {
      newCustomer: {
        name: '',
        address: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    registerCustomer () {
      server({
        method: 'post',
        url: '/customer/register',
        data: {
          name: this.newCustomer.name,
          address: this.newCustomer.address,
          phone: this.newCustomer.phone,
          email: this.newCustomer.email,
          password: this.newCustomer.password
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$router.push({ name: 'Login' })
          this.newCustomer = {
            name: '',
            address: '',
            email: '',
            phone: '',
            password: ''
          }
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style>

</style>
