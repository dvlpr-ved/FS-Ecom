<script setup>
const itemsToShow = ref(4);
const isLoading = ref(true);
const cards = ref([]);
const NoData = ref("");

const { suggestions, vendorsProducts } = defineProps({
  suggestions: {
    default: () => [],
  },
  vendorsProducts: {
    default: () => [],
  },
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
    itemsToShow.value = 2.7;
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
    <div class="container bg-gray-100">
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
        <div class="similarProducts flex flex-wrap lg:gap-3 gap-1 w-full pt-2">
          <div class="heading w-full lg:text-3xl text-3xl py-1 headingsFont">
            Similar Products
          </div>
          <template v-if="suggestions.length < 5">
            <div
              class="cards lg:w-[250px] w-[48%]"
              v-for="card in suggestions"
              :key="card.id"
            >
              <HomePageCard :thumbnail="card.images" :title="card.name" :id="card.id" />
            </div>
          </template>
          <template v-else>
            <carousel :items-to-show="itemsToShow">
              <slide v-for="card in suggestions" :key="card.id">
                <HomePageCard :thumbnail="card.images" :title="card.name" :id="card.id" />
              </slide>
              <template #addons>
                <navigation />
              </template>
            </carousel>
          </template>
        </div>

        <div
          v-if="vendorsProducts.length >= 1"
          class="vendorsProducts flex flex-wrap lg:gap-3 gap-1 w-full pt-3"
        >
          <div class="heading w-full lg:text-3xl text-3xl py-1 headingsFont">
            Seller Products
          </div>
          <template v-if="vendorsProducts.length < 5">
            <div
              class="cards lg:w-[250px] w-[48%]"
              v-for="card in vendorsProducts"
              :key="card.id"
            >
              <HomePageCard :thumbnail="card.images" :title="card.name" :id="card.id" />
            </div>
          </template>
          <template v-else>
            <carousel :items-to-show="itemsToShow">
              <slide v-for="card in vendorsProducts" :key="card.id">
                <HomePageCard :thumbnail="card.images" :title="card.name" :id="card.id" />
              </slide>
              <template #addons>
                <navigation />
              </template>
            </carousel>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.similarCardWrapper {
}
</style>
