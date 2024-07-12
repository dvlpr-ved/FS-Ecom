<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products.value = data.products;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<template>
  <div class="SearchResultPage py-4">
    <div class="container flex flex-wrap justify-between">
      <aside
        class="LeftFilters lg:w-[20%] w-[100%] bg-gray-100 p-5 sticky h-[fit-content] top-2"
      >
        <h1 class="text-3xl text-center">Filters</h1>
        <div class="flex items-center no-tailwind">
          <Checkbox v-model="pizza" class="no-tailwind" inputId="ingredient1" name="pizza" value="Cheese" />
          <label for="ingredient1" class="ml-2"> fliter 1 </label>
        </div>
      </aside>
      <div class="rightSideCards lg:w-[79%] w-[100%]">
        <div class="CardsFlexdiv flex fwrap gap-x-4 gap-y-5">
          <template v-if="loading">
            <!-- Placeholder cards -->
            <ShimmereCard class="lg:block hidden" v-for="n in 4" :key="n" />
            <ShimmereCard class="lg:hidden block max-w-48 mt-4" v-for="n in 4" :key="n" />
          </template>
          <template v-else v-for="item in products" :key="item.id">
            <!-- Render actual product cards -->
            <CommonCard
              :id="item.id"
              :title="item.title"
              :images="item.images"
              :price="item.price"
              :description="item.description"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-paginator .p-paginator-current {
  height: 1rem !important;
}

@media (max-width: 992px) {
  .CardsFlexdiv {
    justify-content: center;
  }
}
</style>
