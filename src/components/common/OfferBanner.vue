<script setup>
const cards = [
  {
    id: 1,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/3f6d1e2a-5ef6-4921-be5d-443a11b11d801651599573985-Dresses_Desk.jpg",
  },
  {
    id: 2,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/a20271c6-249f-480b-bcc7-1b150516e54e1651599573998-Dressberry_Desk.jpg",
  },
  {
    id: 3,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/bc89bda3-e7dc-42fc-91f8-e380f36303c11651599573964-Tops---Tees_Desk.jpg",
  },
  {
    id: 4,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/7feef02b-0072-4c1b-b83d-4e46a5d93c6b1649530621162-Sangria_Desk_Banner.jpg",
  },
  {
    id: 5,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/3f6d1e2a-5ef6-4921-be5d-443a11b11d801651599573985-Dresses_Desk.jpg",
  },
];

const itemsToShow = ref(1);
const isLoading = ref(true);
</script>

<template>
  <div class="appBannerSlider">
    <carousel :items-to-show="itemsToShow"> 
      <slide v-for="card in cards" :key="card.id">
        <img class="slideImg" :src="card.thumbnail" />
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
</template>

<style lang="scss">
.appBannerSlider {
}
</style>
