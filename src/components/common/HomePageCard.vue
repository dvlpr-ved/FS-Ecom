<script setup lang="ts">
  const props = defineProps<{
    thumbnail?: string;
    title?: string;
  }>();
</script>

<template>
  <div class="commonCard border border-l-0">
    <a href="searchresult/">
      <div class="imgsdiv">
        <img class="w-full carimg" :src="props.thumbnail" alt="highlight img" loading="lazy">
      </div>
      <p class="text-2xl text-center pt-3 pb-2">{{ props.title }}</p>
      <p class="cardtitle text-gray-700 text-2xl font-bold"> <span class="line-through">₹1000</span> ₹999</p>
    </a>
  </div>
</template>

<style scoped lang="scss">
.commonCard {
  max-width: 22rem;
  width:100%;
  padding:15px;
  .imgsdiv{
    overflow: hidden;
  }
}

.carimg {
  transform: scale(1);
  height: 300px;
  object-fit: cover;
  transition: all 0.5s ease;
  &:hover{
    transform: scale(1.1);
  }
}
</style>
