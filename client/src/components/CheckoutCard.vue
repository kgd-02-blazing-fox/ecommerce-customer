<template>
  <div class="row border-bottom m-2">
              <div class="col-3 p-0 m-0 h-100">
                <img
                :src="product.Product.image_url"
                alt="No image Preview" style="max-height: 100px; object-fit: cover;">
              </div>
              <div class="col-9 p-0 m-0 h-100 d-inline">
                <label class="btn btn-white btn-lg float-right ">
                  <input type="button" name="button" style="display: none;" ><i class="fas fa-trash-alt" style="color:rgb(165, 82, 243)"></i>
                </label>
                <label class="btn btn-white btn-lg float-right mb-0">
                  <input type="button" name="button" style="display: none;" ><i class="fas fa-edit"  style="color:rgb(165, 82, 243)"></i>
                </label>

                <div class="card-body text-left pt-0 mt-2">
                  <h4 class="card-title">{{product.Product.title}}</h4>
                  <span class="card-text">{{product.Product.price}}</span> <br>
                  <span class="card-text">{{product.amount}} pcs</span> <br>
                  <label class="btn btn-white btn-lg float-right mb-0 p-0">
                    <input type="button" name="button" style="display: none;" ><i class="fas fa-check-circle" style="color:green"></i>
                  </label>
                  <label class="float-right mb-0" style="width: 120px">
                    <input type="button" name="button" style="display: none;" ><i class="fas fa-chevron-circle-left" style="color:rgb(165, 82, 243)"></i>
                    <input type="text" name="text" class="w-25 text-center" value="1" style="border: none; border-bottom: 1.5px solid rgba(193, 130, 252, 0.6);" >
                    <input type="button" name="button" style="display: none;" ><i class="fas fa-chevron-circle-right" style="color:rgb(165, 82, 243)"></i>
                  </label>
                </div>

              </div>
            </div>
</template>

<script>
export default {
  name: 'CheckoutCard',
  props: ['product']
}
</script>

<style>

</style>
