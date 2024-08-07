<script setup>
import { ref } from "vue";
<<<<<<< HEAD

const { results } = defineProps({
  results: {
    type: Object,
    default: {},
  },
});
const navigateForward = (query) => {
  const router = useRouter();
  router.push({
    path: "/searchResult",
    query: query,
  });
};
=======
const emit  = defineEmits(['close']);
const {results} = defineProps({
  results : {
    type : Object,
    default : {}
  }
});
const navigateForward = (query) => {
  emit('close');
  if(query.category){
    const router = useRouter();
    router.push({
        path: '/searchResult',
        query: query
    });
  }
  else{
    navigateTo(`/searchResult/${query.product}`)
  }
}
>>>>>>> f46dfa3b862fa1cf703dc98993774d0e90179db7
</script>

<template>
  <ul class="autoCompleteDropDwon w-full shadow-lg absolute top-[40px] bg-gray-100">
<<<<<<< HEAD
    <li
      v-for="list in results.catg"
      :key="list.id"
      @click="navigateForward({ category: list.id })"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      <div class="flexdiv flex gap-5 items-center">
        <img class="w-[10%] h-8 object-cover" :src="list.image" />
        <span class="text-xl">{{ list.name }}</span>
      </div>
    </li>
    <li
      v-for="list in results.products"
      :key="list.id"
      @click="navigateForward({ product: list.id })"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      <div class="flexdiv flex gap-5 items-center">
        <span class="text-xl">{{ list.name }}</span>
      </div>
    </li>
    <li
      v-for="list in results.tagged"
      :key="list.id"
      @click="navigateForward({ product: list.id })"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
      {{ list.name }}
    </li>
    <li
      v-if="
        results.catg.length == 0 &&
        results.products.length == 0 &&
        results.tagged.length == 0
      "
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
    >
=======
    <li v-for="list in results.catg" :key="list.id"
      @mousedown.prevent="navigateForward({category : list.id})"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300">
      {{ list.name }}
    </li>
    <li v-for="list in results.products" :key="list.id"
      @mousedown.prevent = "navigateForward({product : list.id})"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300">
      {{ list.name }}
    </li>
    <li v-for="list in results.tagged" :key="list.id"
      @mousedown.prevent = "navigateForward({product : list.id})"
      class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300">
      {{ list.name }}
    </li>
    <li v-if="results.catg.length == 0 && results.products.length == 0 && results.tagged.length == 0" class="ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300">
>>>>>>> f46dfa3b862fa1cf703dc98993774d0e90179db7
      No results found
    </li>
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
