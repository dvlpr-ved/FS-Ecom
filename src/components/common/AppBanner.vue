<script setup>
const cards = [
  {
    id: 1,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/3f6d1e2a-5ef6-4921-be5d-443a11b11d801651599573985-Dresses_Desk.jpg",
    thumbnailSm:
      "https://assets.ajio.com/cms/AJIO/MOBILE/M-1.0-UHP-21072024-MainBannerDailyChanging-Z1-P6-Varanga-Jompers-Min70.jpg",
  },
  {
    id: 2,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/a20271c6-249f-480b-bcc7-1b150516e54e1651599573998-Dressberry_Desk.jpg",
    thumbnailSm:
      "https://assets.ajio.com/cms/AJIO/MOBILE/M-1.0-18072024-UHP-MainBanner-RHS-Z1-Golive-Revised.gif",
  },
  {
    id: 3,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/bc89bda3-e7dc-42fc-91f8-e380f36303c11651599573964-Tops---Tees_Desk.jpg",
    thumbnailSm:
      "https://assets.ajio.com/cms/AJIO/MOBILE/M-1.0-UHP-20072024-MainBanner-Z1-ClearanceSale-Flat75.jpg",
  },
  {
    id: 4,
    thumbnail:
      "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/7feef02b-0072-4c1b-b83d-4e46a5d93c6b1649530621162-Sangria_Desk_Banner.jpg",
    thumbnailSm:
      "https://assets.ajio.com/cms/AJIO/MOBILE/M-1.0-UHP-21072024-MainBannerDailyChanging-Z1-P4-TommyHilfiger-Miraggio-Min40.jpg",
  },
];

const itemsToShow = ref(1);
const isLoading = ref(true);
</script>

<template>
  <div class="appBannerSlider">
    <carousel :items-to-show="itemsToShow">
      <slide v-for="card in cards" :key="card.id">
        <img class="slideImg lg:block hidden" :src="card.thumbnail" load />
        <img class="slideImg lg:hidden block" :src="card.thumbnailSm" />
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
</template>

<style lang="scss">
.appBannerSlider {
  .slideImg {
    max-height: auto;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  &:hover .carousel__prev,
  &:hover .carousel__next {
    opacity: 1;
  }

  .carousel__icon {
    filter: invert(1);
  }

  .carousel__prev {
    left: 0;
  }
  .carousel__next {
    right: 0;
  }
  .carousel__prev,
  .carousel__next {
    opacity: 0;
    height: 68px;
    width: 40px;
    background: #fff;
    transition: all 0.5s ease;
    svg {
      filter: unset;
      fill: #717171;
    }

    &:hover {
      filter: brightness(1.2);
    }
  }
}

@media (max-width: 768px) {
}
@media (max-width: 576px) {
}
</style>
