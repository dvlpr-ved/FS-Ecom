<script setup lang="ts">
const props = defineProps<{
  thumbnail?: string;
  title?: string;
  id: Number;
  hidePrice: {
    type: Boolean;
    default: false;
  };
}>();
</script>

<template>
  <div class="commonCard border lg:ml-[2px] tooltipGroup relative">
    <NuxtLink :to="`/searchresult/${props.id}`">
      <div class="imgsdiv">
        <img
          class="w-full cardImg bg-gray-200"
          :src="
            props.thumbnail
              ? props.thumbnail[0].source
              : '_nuxt/assets/images/common/noImage.jpg'
          "
          alt="highlight img"
          loading="lazy"
        />
      </div>
      <p class="ellipsisText lg:text-xl text-center pt-3">
        {{ props.title }}
        <!-- {{ props.title.slice(0, 28) }} -->
      </p>
      <span
        class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
      >
        {{ props.title }}
      </span>

      <p v-if="!hidePrice" class="cardtitle text-gray-700 text-2xl font-bold">
        <span class="line-through">₹1000</span> ₹999
      </p>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.commonCard {
  max-width: 22rem;
  width: 100%;
  padding: 8px;
  .imgsdiv {
    overflow: hidden;
  }
}

.cardImg {
  transform: scale(1);
  height: 300px;
  object-fit: cover;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
}

@media (max-width: 1440px) {
  .commonCard {
    padding: 8px;
  }
  .cardImg {
    height: 250px;
  }
}

@media (max-width: 576px) {
  .commonCard {
    padding: 5px;
  }
  .cardImg {
    height: 200px;
  }
}
</style>
