<script setup>
import { ref } from "vue";
const emit = defineEmits(["close"]);
const { results } = defineProps({
  results: {
    type: Object,
    default: {},
  },
});
console.log(results);
const navigateForward = (query) => {
  emit("close");
  if (query.category) {
    const router = useRouter();
    router.push({
      path: "/searchResult",
      query: query,
    });
  } else {
    navigateTo(`/searchResult/${query.product}`);
  }
};
</script>

<template>
  <ul class="autoCompleteDropDwon w-full shadow-lg absolute top-[40px] bg-gray-100">
    <li
      v-for="list in results.catg"
      :key="list.id"
      @mousedown.prevent="navigateForward({ category: list.id })"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      <div class="flexdiv flex gap-5 items-center justify-between">
        <div class="left flex gap-2 items-center">
          <img class="w-[8%] h-6 object-cover" :src="list.image" />
          <span class="text-xl ellipsisText">{{ list.name }}</span>
        </div>
        <small class="text-sm text-grey-100 inline-block min-w-[10%] pr-3">In CateGories</small>
      </div>
    </li>
    <li
      v-for="list in results.products"
      :key="list.id"
      @mousedown.prevent="navigateForward({ product: list.id })"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      <div class="flexdiv flex gap-5 items-center justify-between">
        <div class="left flex gap-2 items-center">
          <img class="w-[8%] h-6 object-cover" :src="list.images[0].source" />
          <span class="text-xl ellipsisText">{{ list.name }}</span>
        </div>
        <small class="text-sm text-grey-100 inline-block min-w-[10%] pr-3">In Products</small>
      </div>
    </li>
    <li
      v-for="list in results.tagged"
      :key="list.id"
      @mousedown.prevent="navigateForward({ product: list.id })"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      <div class="flexdiv flex gap-5 items-center justify-between">
        <div class="left flex gap-2 items-center">
          <img class="w-[8%] h-6 object-cover" :src="list.images[0].source" />
          <span class="text-xl ellipsisText">{{ list.name }}</span>
        </div>
        <small class="text-sm text-grey-100 inline-block min-w-[10%] pr-3">Tagged</small>
      </div>
    </li>
    <!-- <li
      v-if="
        results.catg.length === 0 &&
        results.products.length === 0 &&
        results.tagged.length === 0
      "
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      No results found
    </li> -->
  </ul>
</template>

<style scoped>
.autoCompleteDropDwon {
  max-height: 60vh;
  overflow-y: auto;

  li {
    padding-left: 15px;

    &:hover {
      padding-left: 25px;
    }
  }
}
</style>
