<script setup lang="ts">
  const props = defineProps<{
    thumbnail?: string;
    title?: string;
  }>();
</script>

<template>
  <div class="commonCard shadow">
    <a href="searchresult/">
      <div class="imgsdiv">
        <img class="w-full carimg" :src="props.thumbnail" alt="highlight img">
      </div>
      <p class="text-2xl text-center py-4">{{ props.title }}</p>
    </a>
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
