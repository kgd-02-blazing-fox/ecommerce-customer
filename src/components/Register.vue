<template>
  <div class="container mt-5">
    <h2><i class="fas fa-address-card"></i> foxshop registration</h2>
    <div class="row d-flex justify-content-center">
      <div class="col-8 border shadow rounded">

      <!-- REGISTER FORM -->
      <div class="my-4">
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email"
            label-for="input-1"
            description="Email must be in valid email format."
          >
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Password"
            label-for="input-2"
            description="Password must be 8-20 characters long, contain letters and numbers, and must not
            contain spaces, special characters, or emoji."
          >
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>

      <div class="row">
        <div class="col d-flex justify-content-end">
          <b-button type="submit" variant="primary">register</b-button>
        </div>
        <div class="col d-flex justify-content-start">
          <b-button type="reset" variant="danger">reset</b-button>
        </div>
      </div>
    </b-form>
  </div>
      </div>
    </div>
    <div class="mt-5 row d-flex justify-content-center">
      <div id="move" @click.prevent="login" class="col-12 ">
        <b> <i class="fas fa-sign-in-alt"></i> already register ?</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      show: true
    }
  },
  methods: {
    onSubmit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    },
    onReset (evt) {
      evt.preventDefault()
      this.email = ''
      this.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#move b {
  transition: 1s;
}
#move b:hover {
  color: #ee5253;
  transition: 1s;
  font-size: 24px;
}
</style>
