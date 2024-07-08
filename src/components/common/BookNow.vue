<script setup lang="ts">
  const props = defineProps<{
    bookingLink?: string;
    bounceAni?: string;
  }>();
</script>
<template>
    <NuxtLink :to="props.bookingLink"
        :class="`Booknowbtn ${props.bounceAni} py-3 bg-green-400 text-white capitalize rounded text-2xl text-center flex items-center gap-2 justify-center`" target="_blank"
    ><i class="pi pi-whatsapp lg:text-3xl text-2xl"></i> Book Now</NuxtLink>
</template>