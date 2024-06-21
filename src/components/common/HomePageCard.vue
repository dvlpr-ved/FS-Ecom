<script setup lang="ts">

const props = defineProps<{
  ImgURL?: string;
  title?: string;
}>();
</script>

<template>
  <div class="commonCard shadow">
    <img class="w-full carimg" :src="props.ImgURL" alt="highlight img">
    <p class="text-2xl text-center py-4">{{ props.title }}</p>
  </div>
</template>



<script setup>

</script>

<style lang="scss" scoped>
.commonCard {
  max-width: 22rem;

  .carimg {
    height: 300px;
    object-fit: cover;
  }
}
</style>
