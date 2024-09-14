<script setup lang="ts">
  const {data} = defineProps({
    data : {
      default : []
    }
  });
</script>
<template>
  <div class="reviewRatingBox">
    <div class="reviewRating_inner">
      <div v-for="rating in data" class="ratingbox flex gap-2 items-center">
        <div class="stars flex gap-1">
          <span :class="`px-2 py-[1px] bg-green-600 text-white rounded text-sm`">{{ rating.rating }}</span>
        </div>
        <p>{{ rating.review }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
