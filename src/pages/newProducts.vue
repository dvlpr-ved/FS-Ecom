<script setup>
import { useToast } from "primevue/usetoast";

const images = [
  "https://fashtsaly.com/wp-content/uploads/2023/03/44002511001-2-600x901.jpeg",
  "https://fashtsaly.com/wp-content/uploads/2023/03/1100251105C-3-600x750.jpeg",
  "https://fashtsaly.com/wp-content/uploads/2023/03/11002511006-1-600x772.jpeg",
  "https://fashtsaly.com/wp-content/uploads/2023/03/11002511007A-2.jpeg",
];

const itemsToShow = ref(2);
const toast = useToast();

const show = (message) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

const addToCart = async () => {};
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
      <div class="content bg-white">
        <div class="topConten p-3">
          <p class="p_name text-xl mb-1">
            Heavy Hand Bandhej Art Silk Saree with Running Blouse
          </p>
          <p class="cardtitle text-gray-700 text-2xl font-bold">
            <span class="line-through text-2xl">₹1000</span> ₹999
          </p>
          <span class="bgblue80 py-1 px-2 block w-fit capitalize mt-1 text-white"
            >save 15%</span
          >
        </div>
        <div class="iconsDiv flex gap-5 border-t border-gray-300 mt-2 py-2 px-3">
          <div class="heartsdiv">
            <i
              class="text-4xl pi pi-heart"
              style="color: rgb(239 68 68)"
              @click="addToCart()"
            ></i>
            <!-- <i
              @click="addToCart()"
              class="text-4xl pi pi-heart-fill"
              style="color: rgb(239 68 68)"
              
            ></i> -->
          </div>
          <div class="sharedivsoc">
            <i class="pi pi-send text-4xl"></i>
          </div>
          <!-- only for subscriber -->
          <div class="download">
            <i class="pi pi-download text-4xl"></i>
          </div>
        </div>
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
