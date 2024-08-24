<script setup>
const itemsToShow = ref(4);
const isLoading = ref(true);
const cards = ref([]);
const NoData = ref("");

const {suggestions} = defineProps({
  suggestions : {
    default : () => []
  }
});
const getData = async () => {
  try {
    const r = await fetch("https://dummyjson.com/products/category/womens-dresses");
    const rJson = await r.json();
    cards.value = rJson.products;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching products:", error);
    NoData.value = "Error fetching products";
  }
};

const updateItemsToShow = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 576) {
    itemsToShow.value = 2;
  } else if (screenWidth < 768) {
    itemsToShow.value = 3;
  } else if (screenWidth < 1024) {
    itemsToShow.value = 4;
  } else if (screenWidth < 1440) {
    itemsToShow.value = 5;
  } else {
    itemsToShow.value = 5;
  }
};

onMounted(() => {
  getData();
  window.addEventListener("resize", updateItemsToShow);
  updateItemsToShow();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsToShow);
});
</script>

<template>
  <div class="similarCardWrapper">
    <div class="container bg-white">
    <div class="heading w-full lg:text-6xl text-4xl py-5 headingsFont">Similar Products</div>
      <template v-if="isLoading">
        <div class="lg:flex hidden justify-between py-4">
          <ShimmereCard />
          <ShimmereCard />
          <ShimmereCard />
          <ShimmereCard />
        </div>
        <!-- for mb -->
        <div class="flex lg:hidden justify-between pb-5">
          <div class="w-[48%] h-40 animate-pulse bg-gray-200"></div>
          <div class="w-[48%] h-40 animate-pulse bg-gray-200"></div>
        </div>
      </template>
      <div v-else class="relative pb-5">
        <h1>{{ NoData }}</h1>
        <carousel :items-to-show="itemsToShow">
          <slide v-for="card in suggestions" :key="card.id">
            <HomePageCard :thumbnail="card.images" :title="card.name" :id="card.id" />
          </slide>
          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.similarCardWrapper {
}
</style>
