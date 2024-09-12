<script setup>
const cartstore = useCartStore();
const CartItems = computed(() => cartstore.getCartLength || "");
</script>

<template>
  <myCarts />
  <mostViewdProducts v-if="CartItems == 0" />
</template>
