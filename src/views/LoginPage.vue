<template>
  <div class="container mt-5">
    <div class="position-sticky sticky-top colini">
      <Alert
      v-if="alert.isOn === true"
      :message="alert.message"
      />
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Alert from '@/components/Alert.vue'

export default {
  name: 'Home',
  components: {
    Alert
  },
  computed: {
    alert () {
      return this.$store.state.alert
    }
  }
}
</script>
