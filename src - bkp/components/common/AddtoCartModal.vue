<script setup>
const props = defineProps({
  Checkvisible: String,
  handleAdCartClose: Function,
});
</script>
<template>
  <div
    :class="`addtocartmain ${Checkvisible} shadow-lg fixed bottom-0 top-0 h-[100%]  bg-white flex justify-center items-center`"
  >
    <button class="closebtn absolute top-5 right-5" @click="handleAdCartClose">
      <i class="pi pi-times text-3xl"></i>
    </button>
    <div class="innerdiv w-[100%] text-center">
      <img
        class="w-[200px] h-[200px] object-cover m-auto mb-4"
        src="https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg"
        alt=""
      />
      <p class="cardtitle text-2xl font-[500] text-black mb-3">
        <span class="line-through text-gray-700">₹800</span> ₹700
      </p>
      <p class="title text-2xl mb-4">Banarasi Blue Saree</p>
      <h6 class="font-bold text-3xl mb-4">
        <span class="text-3xl">Total : </span> RS.799
      </h6>
      <!-- <button class="py-3 w-[48%] bg-black text-white capitalize rounded">Proceed To Bag</button> -->
      <NuxtLink
        to="../checkout"
        class="py-3 w-[48%] bg-black text-white capitalize rounded px-3"
        >Proceed To Bag</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss">
.addtocartmain {
  right: -100%;
  width: 300px;
  z-index: -1;
  transition: all 0.6s ease-in-out;

  &.active {
    right: 0;
    z-index: 9;
  }
}
</style>
