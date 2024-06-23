<script setup>
import { ref } from "vue";

const queryItems = ref([
  {
    id: 1,
    searchQuery: 'Query 1'
  },
  {
    id: 2,
    searchQuery: 'Query 2'
  },
  {
    id: 3,
    searchQuery: 'Query 3'
  },
  {
    id: 4,
    searchQuery: 'Query 4'
  },
  {
    id: 4,
    searchQuery: 'Query 4'
  },
  {
    id: 5,
    searchQuery: 'Query 5'
  },
  {
    id: 6,
    searchQuery: 'Query 6'
  },
  {
    id: 7,
    searchQuery: 'Query 7'
  },
  {
    id: 8,
    searchQuery: 'Query 8'
  },
  {
    id: 9,
    searchQuery: 'Query 9'
  },
]);

</script>


<template>
  <ul class="autoCompleteDropDwon w-full absolute top-[40px]">
    <li v-for="(items, index) in queryItems"
      class="bg-white ease-linear duration-300 py-2 cursor-pointer capitalize border-bottom-1 border-gray-300"
      :key="index">{{ items.searchQuery }}
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
