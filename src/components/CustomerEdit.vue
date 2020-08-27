<template>
  <div>
    <h3>Edit Data</h3>
    <section id="customerEditForm">
      <div class="container">
        <div class="col s12 m4">
          <ErrorSection></ErrorSection>
          <div class="input-field">
            <p class="left-align">Name</p>
            <input id="newName" v-model="editedCustomer.name" type="text" class="validate" placeholder="Full Name" required>
          </div>
          <div class="input-field">
            <p class="left-align">Address</p>
            <input id="newAddress" v-model="editedCustomer.address" type="text" class="validate" placeholder="Address" required>
          </div>
          <div class="input-field">
            <p class="left-align">Phone</p>
            <input id="newPhone" v-model="editedCustomer.phone" type="number" class="validate" placeholder="Phone" required>
          </div>
          <div class="input-field">
            <p class="left-align">Email</p>
            <input id="newEmail" v-model="editedCustomer.email" type="email" readonly>
          </div>
          <div class="row">
            <div class="col s12 m3 push-m3">
              <button type="submit" class="btn grey darken-3 z-depth-3" @click.prevent="editCustomerDetail">Save</button>
            </div>
            <div class="col s12 m3 push-m2">
              <router-link :to="'/customer'"><button class="btn red darken-1 z-depth-3">Cancel</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import server from '../api/index'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'CustomerEdit',
  components: {
    ErrorSection
  },
  data () {
    return {
      editedCustomer: {
        name: '',
        address: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    currentCustomer () {
      return this.$store.state.currentCustomer
    }
  },
  methods: {
    fetchCustomerDetail () {
      this.editedCustomer.name = this.currentCustomer.name
      this.editedCustomer.address = this.currentCustomer.address
      this.editedCustomer.email = this.currentCustomer.email
      this.editedCustomer.phone = this.currentCustomer.phone
    },
    editCustomerDetail () {
      server({
        method: 'put',
        url: '/customer',
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.editedCustomer.name,
          address: this.editedCustomer.address,
          phone: this.editedCustomer.phone,
          email: this.editedCustomer.email
        }
      })
        .then(response => {
          this.$store.dispatch('fetchCustomerDetail')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$router.push({ name: 'Customer' })
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
    }
  },
  mounted () {
    this.fetchCustomerDetail()
  }
}
</script>

<style>

</style>
