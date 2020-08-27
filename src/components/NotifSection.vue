<template>
  <div class="container" id="notifSection">
    <h5 class="center">{{ currentNotif }}</h5>
  </div>
</template>

<script>
export default {
  name: 'NotifSection',
  computed: {
    currentNotif () {
      return this.$store.state.currentNotif
    }
  },
  created () {
    setTimeout(() => {
      this.$store.commit('changeCurrentNotif', '')
    }, 5000)
  },
  updated () {
    setTimeout(() => {
      this.$store.commit('changeCurrentNotif', '')
    }, 5000)
  }
}
</script>

<style scoped>
#notifSection {
  color: green;
  padding-top: 20px;
}
</style>
