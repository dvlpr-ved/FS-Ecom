<script setup lang="ts">
  const props = defineProps<{
    thumbnail?: string;
    title?: string;
  }>();
</script>

<template>
  <div class="commonCard shadow">
    <NuxtLink to="searchresult/">
      <div class="imgsdiv">
        <img class="w-full carimg" :src="props.thumbnail" alt="highlight img" loading="lazy">
      </div>
      <p class="text-2xl text-center py-4">{{ props.title }}</p>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.commonCard {
  max-width: 22rem;
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
