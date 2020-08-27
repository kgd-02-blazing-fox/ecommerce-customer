<template>
  <div>
    <div id="loginForm" class="container">
      <div class="col s12 m4">
        <h4 class="center grey-text text-darken-4">Welcome to Digi-One</h4>
        <NotifSection></NotifSection>
        <ErrorSection></ErrorSection>
        <div class="row">
          <div class="input-field col s12 m6 push-m3">
            <input id="email" v-model="customer.email" type="email" class="validate" required>
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row center-align">
          <div class="input-field col s12 m6 push-m3">
            <input id="password" v-model="customer.password" type="password" class="validate" required>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <div class="col m3 push-m3">
            <button type="submit" class="btn grey darken-4 z-depth-3" @click.prevent="loginCustomer">Login</button>
          </div>
          <div class="col m3 push-m3">
            <router-link :to="'/'"><button class="btn red darken-1 z-depth-3">Cancel</button></router-link>
          </div>
        </div>
        <div class="row">
          <div class="col m4 push-m4">
            <p>New member?</p>
            <router-link :to="'/register'"><button class="btn btn-small grey darken-4 z-depth-3">Register</button></router-link>
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
  name: 'Login',
  components: {
    NotifSection, ErrorSection
  },
  data () {
    return {
      customer: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginCustomer () {
      server({
        method: 'post',
        url: '/customer/login',
        data: {
          email: this.customer.email,
          password: this.customer.password
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('currentUserId', response.data.data.id)
          localStorage.setItem('currentUserName', response.data.data.name)
          this.$router.push({ name: 'Dashboard' })
          this.customer.email = ''
          this.customer.password = ''
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
          console.log(err.response.data.err)
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

<style scoped>
  #loginForm {
    padding-top: 100px;
  }
</style>
