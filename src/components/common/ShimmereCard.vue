<template>
  <div class="cardshimmer">
    <div class="p-9 shimmer animate-pulse rounded bg-gray-200 w-full" style="height: 200px"></div>
    <span class="p-9 shimmer block animate-pulse rounded bg-gray-200 w-full"></span>
  </div>
</template>

<script setup></script>

<style scoped>
.cardshimmer {
  max-width: 24%;
  width: 100%;
}

@media (max-width: 768px) {
  .cardshimmer {
    max-width: 48%;
  }
}
</style>
