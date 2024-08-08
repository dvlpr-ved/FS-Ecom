<script setup lang="ts">
const {data} = defineProps({
  data : {
    default : () => []
  }
});
// console.log(data);
// const responsiveOptions = ref([
//     {
//         breakpoint: '1300px',
//         numVisible: 4
//     },
//     {
//         breakpoint: '575px',
//         numVisible: 1
//     }
// ]);
</script>

<template>
<Galleria :value="data"  :numVisible="1" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.source" :alt="slotProps.item.source" style="width: 100%" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.source" :alt="slotProps.item.source" />
    </template>
</Galleria>  
  <!-- <div class="productGallery">
    <image-magnifier
      :src="image"
      :zoom-src="image"
      width="400"
      height="300"
      zoom-width="400"
      zoom-height="300"
    ></image-magnifier>
  </div> -->
</template>

<style lang="scss">
.ddd {
}
</style>