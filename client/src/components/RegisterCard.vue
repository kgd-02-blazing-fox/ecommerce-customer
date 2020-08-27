<template>
  <div class="container-fluid mt-5">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="border col-md-5" style="padding: 30px; border-radius: 40px;">
          <h3 class="justify-content-center text-center">E-Commerce Customer Register</h3><br>
          <form id="form-register" @submit.prevent="register">
            <div class="form-group">
              <label for="register-text">Name</label>
              <input type="text" class="form-control" placeholder="John Doe" v-model="name">
              <!-- <p style="color: red;">*Please enter your name</p> -->
            </div>
            <div class="form-group">
              <label for="register-email">Email address</label>
              <input type="email" class="form-control" placeholder="johndoe@mail.com" v-model="email">
              <!-- <p style="color: red;">*Please enter your email</p> -->
            </div>
            <div class="form-group">
              <label for="register-password">Password</label>
              <input type="password" class="form-control" placeholder="******" v-model="password">
              <!-- <p style="color: red;">*Please enter your password</p> -->
            </div>
            <div class="row" style="display: flex; flex-direction: column; margin: auto; align-items: center;">
              <button type="submit" class="btn" style="width: 100px;">Submit</button><br>
            </div>
          </form>
          <div class="col-md-12 text-center">
            <!-- <p style="color: red;">Sorry! Something went wrong!</p> -->
            <p style="color: red;" v-if="errorMessage">{{errorMessage}}</p>
            <p class="text-secondary">Already have an account?
            <router-link to="/login" class="text-primary" tag="span">Login</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterCard',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  created () {
    this.$store.commit('SET_LOGGED')
  },
  methods: {
    register () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/shop')
        })
        .catch(err => {
          console.log(err.response.data)
          this.errorMessage = err.response.data.message
        })
    }
  }
}
</script>

<style>

</style>
