
<template>
  <carousel :items-to-show="2">
    <slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>

  <AppBanner />
  <CateGories />
  <Highlights />
  <Highlights />
  <OfferBanner />
  <Highlights />
</template>

<style scoped>
<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>

<script setup>
  const products = ref([
    {
      name : 'ved',
      id : 1
    },
    {
      name : 'ved',
      id : 2
    },
    {
      name : 'ved',
      id : 3
    },
    {
      name : 'ved',
      id : 1
    },
    {
      name : 'ved',
      id : 2
    },
    {
      name : 'ved',
      id : 3
    }
  ]);
  const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);
</script>