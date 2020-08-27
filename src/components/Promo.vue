<template>
  <div id="padd" class="row">
    <div class="col">
      <div class="card">
        <img @click="promoSeason" class="img-responsive" src="../assets/promo1.png" style="height:250px">
      </div>
    </div>
    <div class="col">
      <div class="card">
        <img  @click="promoSeason" class="img-responsive" src="../assets/promo2.png" style="height:250px">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Promo',
  methods: {
    promoSeason () {
      this.$store.commit('ALERT', 'COMING SOON!')
    }
  }
}
</script>

<style scoped>
#padd{
  padding: 0px;
  margin: 0px;
  cursor: pointer;
}
</style>
