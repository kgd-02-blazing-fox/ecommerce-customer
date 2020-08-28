<template>
  <div class="container p-2" style="height: 180px;">
            <div class="row border m-2">
              <div class="col-3 p-0 m-0 h-100">
                <img
                :src="product.image_url"
                alt="No image Preview" style="max-height: 140px;max-width: 140px; object-fit: cover;"
                @click.prevent="toDetail"
                >
              </div>
              <div class="col-9 p-0 m-0 h-100 d-inline" @click.prevent="toDetail">
                <label class="btn btn-white btn-lg float-right mb-0">
                  <input type="button" name="button" style="display: none;" @click.prevent="toDetail"><i class="fas fa-info-circle" style="color:gray"></i>
                </label>
                <div class="card-body text-left pt-0 mt-2">
                  <h4 class="card-title">{{product.name}}</h4>
                  <span class="card-text">{{product.price}}</span> <br>
                  <span class="card-text">Stock: {{product.stock}}</span> <br>
                </div>
              </div>
            </div>
          </div>
</template>

<script>
export default {
  name: 'CardV',
  props: ['product'],
  methods: {
    toDetail () {
      this.$router.push('/iteminfo/' + this.product.id)
    }
  }
}
</script>

<style>

</style>
