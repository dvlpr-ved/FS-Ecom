<script setup>
const images = [
  "https://fashtsaly.com/wp-content/uploads/2023/03/44002511001-2-600x901.jpeg",
  "https://fashtsaly.com/wp-content/uploads/2023/03/1100251105C-3-600x750.jpeg",
  "https://fashtsaly.com/wp-content/uploads/2023/03/11002511006-1-600x772.jpeg",
  "https://fashtsaly.com/wp-content/uploads/2023/03/11002511007A-2.jpeg",
];

const itemsToShow = ref(2);
</script>
<template>
  <div class="newProductsWrapper bg-gray-200">
    <!-- we will loop this card -->
    <div class="newProductsCard w-full m-auto py-2">
      <div class="carouselNewProduct">
        <carousel :items-to-show="itemsToShow">
          <slide v-for="(img, index) in images" :key="index">
            <img
              class="slideImg max-h-[350px] h-full object-cover"
              :src="img"
              :alt="img"
            />
          </slide>
        </carousel>
      </div>
      <div class="content p-3 bg-white">
        <p class="p_name text-3xl mb-1">Saree</p>
        <p class="cardtitle text-gray-700 text-3xl font-bold">
          <span class="line-through text-2xl">₹1000</span> ₹999
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.newProductsCard {
  max-width: 576px;
  margin: 0 auto;
  margin-bottom: 15px;

  .slideImg {
  }
}
</style>
