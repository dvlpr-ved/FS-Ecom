<script setup>
import { ref } from "vue";
import AutoComplete from 'primevue/autocomplete';

const value = ref("");
const items = ref([]);

const search = (event) => {
  items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
};
</script>


<template>
  <div class="searchField">
    <AutoComplete v-model="value" :suggestions="items" @complete="search" />
  </div>
</template>

<style scoped>
.searchField {
  border: 1px solid #ddd;
}

.custom-autocomplete .p-autocomplete-input {
  width: 100% !important;
  padding: 15px;
  /* Add more styles as needed */
}
</style>
