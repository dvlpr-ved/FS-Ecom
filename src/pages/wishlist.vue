<script setup>
const getWishlistItems = useWishlistStore();
const wishlistd = computed(() => getWishlistItems.getWishlistLength || "");
</script>

<template>
  <MyWhitelist />
  <MostViewdProducts v-if="wishlistd == 0" />
</template>
