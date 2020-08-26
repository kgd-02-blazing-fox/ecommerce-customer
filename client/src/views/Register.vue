<template>
<div class="container">
  <div class="row justify-content-center" >
    <div class="col-sm-6" style="border: 2px solid black; margin-bottom:20px; padding:20px 10px; border-radius:20px; background-color:#ccc;">
      <!-- <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="alert alert-success" role="alert">A simple success alert—check it out!</div> -->
      <form @submit.prevent="register">
        <h3 style="font-family: 'Piedra', cursive; font-size:32px">REGISTER FORM</h3>
        <!-- <router-link :to="{ name: 'Login' }">Login Here</router-link> -->
        <br><br>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autocomplete="off">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const userInput = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('postRegister', userInput)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Piedra&display=swap');

</style>
