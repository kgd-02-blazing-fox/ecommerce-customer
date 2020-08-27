<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  created () {
    if (localStorage.token) {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style>

</style>
