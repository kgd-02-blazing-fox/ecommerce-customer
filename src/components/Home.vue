<template>
  <div>
    <div class="slider" id="slider">
      <ul class="slides">
        <li>
          <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=622&q=80">
          <div class="caption center-align">
            <h3>Welcome to Digi-One</h3>
            <h5 class="light grey-text text-lighten-3">The best shopping hall for your gadget</h5>
            <div class="row" id="loginRegisterSign">
              <div class="col s12 m6">
                <router-link :to="'/login'"><a class="white-text">Login</a></router-link>
              </div>
              <div class="col s12 m6">
                <router-link :to="'/register'"><a class="white-text">Register</a></router-link>
              </div>
            </div>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1548268567-4610dc7a5a16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80">
          <div class="caption left-align">
            <h3>iPhone 11 Pro</h3>
            <h5 class="light grey-text text-lighten-3">the most powerful iPhone is here</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80">
          <div class="caption center-align">
            <h3>Macbook Air</h3>
            <h5 class="light grey-text text-lighten-3">Apple latest and lightest macbook ever</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80">
          <div class="caption right-align">
            <h3 class="light grey-text text-darken-3">iPad Pro 2020</h3>
            <h5 class="light grey-text text-darken-3">Best for studying and portable productivity</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1530961915006-1cbd0d169f28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80">
          <div class="caption left-align">
            <h3 class="light blue-text text-darken-4">Samsung Galaxy S20</h3>
            <h5 class="light blue-text text-darken-4">Most popular android phone 2020</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1587749090881-1ea18126ab3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80">
          <div class="caption center-align">
            <h3>New Galaxy S20 Pro</h3>
            <h5 class="light grey-text text-lighten-3">From pro engineer, for pro user</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1461773518188-b3e86f98242f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80">
          <div class="caption right-align">
            <h3 class="light grey-text text-darken-4">iMac Pro</h3>
            <h5 class="light grey-text text-darken-4">For you who seek the best spec iMac</h5>
          </div>
        </li>
        <li>
          <img src="https://gizmologi.id/wp-content/uploads/2019/07/ASUS-ROG-Mothership.jpg">
          <div class="caption left-align">
            <h3>ROG Mothership</h3>
            <h5 class="light grey-text text-lighten-3">Most powerful portable gaming PC</h5>
          </div>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="row">
        <div class="col s12 m3 push-m2">
          <p>For Digi-One Member</p>
          <router-link :to="'/login'"><button class="btn btn-large grey darken-4 z-depth-4">Login</button></router-link>
        </div>
        <div class="col s12 m3 push-m4">
          <p>For New Member</p>
          <router-link :to="'/register'"><button class="btn btn-large grey darken-4 z-depth-4">Register</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    const slider = document.querySelectorAll('#slider')
    M.Slider.init(slider, {
      indicators: false,
      height: 625,
      interval: 5000
    })
  }
}
</script>

<style scoped>
  img {
    object-fit: cover;
  }
  a {
    font-size: 50px;
  }
  p {
    font-size: 20px;
  }
  h3 {
    font-weight: bolder;
    text-shadow: 2px 2px 5px grey
  }
  #loginRegisterSign {
    padding-top: 50px;
  }
</style>
