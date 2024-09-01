<script setup>
const { data } = defineProps({
  data: {
    type: Object,
  },
});

const itemsToShow = ref(1);
const isLoading = ref(true);
</script>

<template>
  <div v-if="data.source.length > 1" class="appBannerSlider">
    <carousel :items-to-show="itemsToShow">
      <slide v-for="card in data.source" :key="card.source">
        <NuxtLink to="#">
          <img class="slideImg lg:block hidden" :src="card.source" loading="lazy" />
          <img class="slideImg lg:hidden block" :src="card.source" loading="lazy" />
        </NuxtLink>
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </div>
  <div v-else class="appBannerSlider">
    <NuxtLink to="#">
      <img class="slideImg lg:block hidden" :src="data.source[0].source" loading="lazy" />
    </NuxtLink>
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
