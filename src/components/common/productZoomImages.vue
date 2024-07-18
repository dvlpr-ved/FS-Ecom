<script setup lang="ts">
const images = ref([
  {
    src:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/k/u/2/xxl-tie-dye-001-fabunna-cotton-original-imagzwfb5v6mjupy.jpeg?q=70&crop=false",
  },
  {
    src:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/j/7/e/xxs-m-rani-printed-jalwaniya-original-imagxyh45nr2r8gf.jpeg?q=70&crop=false",
  },
  {
    src:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/0/0/r/xxs-m-rani-printed-jalwaniya-original-imagxyh4qfqbejat.jpeg?q=70&crop=false",
  },
  {
    src:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/j/7/e/xxs-m-rani-printed-jalwaniya-original-imagxyh45nr2r8gf.jpeg?q=70&crop=false",
  },
]);
</script>

<template>
  <div class="productGallery">
    <image-magnifier
      :src="image"
      :zoom-src="image"
      width="400"
      height="300"
      zoom-width="400"
      zoom-height="300"
    ></image-magnifier>
  </div>
</template>

<style lang="scss">
.ddd {
}
</style>
