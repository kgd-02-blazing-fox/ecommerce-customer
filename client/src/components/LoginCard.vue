<template>
  <div class="container-fluid mt-5">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="border col-md-5" style="padding: 30px; border-radius: 40px;">
          <h2 class="justify-content-center text-center">E-Commerce Customer Login</h2>
          <br />
          <form id="form-login" @submit.prevent="login">
            <div class="form-group">
              <label for="login-email">Email address</label>
              <input type="email" class="form-control" placeholder="johndoe@mail.com" v-model="email"/>
              <!-- <p style="color: red;" v-if="errorMessage === 'Please fill in the email'">*Please fill in your email</p> -->
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <input type="password" class="form-control" placeholder="******" v-model="password"/>
              <!-- <p style="color: red;" v-if="errorMessage === 'Please fill in the password'">*Please enter your password</p> -->
            </div>
            <div
              class="row"
              style="display: flex; flex-direction: column; margin: auto; align-items: center;"
            >
              <button type="submit" class="btn btn-primary" style="width: 100px;">Login</button>
              <br />
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSignIn">Login</GoogleLogin>
              <br />
            </div>
          </form>
          <div class="col-md-12 text-center">
            <!-- <p style="color: red;" v-if="errorMessage === 'internal error'">Sorry! Something went wrong!</p> -->
            <p style="color: red;" v-if="errorMessage">{{errorMessage}}</p>
            <p class="text-secondary">
              Doesn't have account yet?
              <router-link to="/register" class="text-primary" tag="span">Register</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import Axios from '../server/Axios.js'
export default {
  name: 'LoginCard',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: '',
      params: {
        client_id: '124739969343-6vfnqc1fk4kniu587sn91ep7vtativjg.apps.googleusercontent.com'
      },
      renderParams: {
        width: 100,
        height: 30,
        longtitle: false
      }
    }
  },
  methods: {
    onSignIn (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      Axios({
        method: 'POST',
        url: 'Glogin',
        headers: {
          google_token: idToken
        }
      })
        .then(response => {
          console.log(response)
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          this.errorMessage = err.response.data.message
        })
    },
    login () {
      Axios({
        method: 'POST',
        url: 'login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err.response.data)
          this.errorMessage = err.response.data.message
        })
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

<style>
</style>
