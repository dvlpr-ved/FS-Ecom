<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRuntimeConfig } from "nuxt/app";

const products = ref([]);
const allProducts = ref([]); // To keep a copy of all products for filtering
const loading = ref(true);
const isMobileNavVisible = ref("");
const route = useRoute();
const selectedCategories = ref(["allCategories"]); // To hold selected categories
const selectedSort = ref(""); // To hold the selected sorting option

const suffix = ref('');
const categoryFilter = ref([]);
const getDataFunc = async () => {
  try {
    const config = useRuntimeConfig();
    const query = route.query;
    if(query.category){
        suffix.value = `api/fetchSearchItems?category=${query.category}`;
    }
    else if(query.listing_id){
      suffix.value = `api/fetchSearchItems?listing=${query.listing_id}`;
    }
    else{
      suffix.value = `api/fetchSearchItems?product=${query.product}`;
    }

    const res = await fetch(
      `${
        config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
      }${suffix.value}`,
      { method: "POST" }
    );
    const data = await res.json();
    if (data.success) {
      allProducts.value = data.data.data; // Store all products
      products.value = data.data.data;
      categoryFilter.value = data.data_category;
      applyFilters();
      loading.value = false;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const applyFilters = () => {
  let sortedData = [...allProducts.value];

  // Filter by selected categories
  if (!selectedCategories.value.includes("allCategories")) {
    sortedData = sortedData.filter((product) =>
      selectedCategories.value.includes(product.category.toString())
    );
  }

  // Sorting logic
  if (selectedSort.value === "latest") {
    sortedData = sortedData.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (selectedSort.value === "lowToHigh") {
    sortedData = sortedData.sort((a, b) => a.mrp - b.mrp);
  } else if (selectedSort.value === "highToLow") {
    sortedData = sortedData.sort((a, b) => b.mrp - a.mrp);
  }

  products.value = sortedData;
};

const handleSortChange = (event) => {
  selectedSort.value = event.target.value;
  applyFilters();
  closeFilter();
};

const handleCategoryChange = (event, categoryId) => {
  if (event.target.checked) {
    // Add the category to selected filters
    selectedCategories.value.push(categoryId.toString());
  } else {
    // Remove the category from selected filters
    selectedCategories.value = selectedCategories.value.filter(
      (filter) => filter !== categoryId.toString()
    );
  }

  applyFilters();
  closeFilter();
};

const handleAllCategoriesChange = (event) => {
  if (event.target.checked) {
    selectedCategories.value = ["allCategories"];
  } else {
    selectedCategories.value = selectedCategories.value.filter(
      (filter) => filter !== "allCategories"
    );
  }
  applyFilters();
  closeFilter();
};

const openFilter = () => {
  isMobileNavVisible.value = "active";
};

const closeFilter = () => {
  isMobileNavVisible.value = "";
};

watch(
  () => route.query,
  () => {
    getDataFunc();
  }
);
onMounted(async () => {
  getDataFunc();
});
</script>

<template>
  <div class="SearchResultPage py-4">
    <div class="container flex flex-wrap justify-between">
      <aside
        class="LeftFilters lg:w-[20%] w-[100%] bg-gray-100 sticky z-[12] py-2 h-[fit-content] lg:top-2 top-0"
      >
        <div
          class="flexdiv fixinMb lg:block flex justify-between lg:border-b px-4 py-2 lg:mb-3"
        >
          <h1 class="text-xl">Filters</h1>
          <button class="lg:hidden filterBtn" @click="openFilter">
            <i class="pi pi-filter text-3xl"></i>
          </button>
        </div>
        <div :class="['overlay', isMobileNavVisible]" @click="closeFilter"></div>
        <div :class="['checkboxWrapper px-4 transition-all', isMobileNavVisible]">
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="allCategories"
              type="checkbox"
              value="allCategories"
              name="checkboxcategory"
              :checked="selectedCategories.includes('allCategories')"
              @change="handleAllCategoriesChange"
            />
            <label for="allCategories" class="text-xl title capitalize"
              >All Categories</label
            >
          </div>
          <div v-for="c in categoryFilter" class="checkbox mb-3" :key="c.id">
            <input
              class="styled-checkbox"
              :id="'category_checkbox'+c.id"
              type="checkbox"
              name="checkboxcategory"
              :value="'category'+c.id"
              :checked="selectedCategories.includes(c.id.toString())"
              @change="(event) => handleCategoryChange(event, c.id)"
            />
            <label :for="'category_checkbox'+c.id" class="text-xl title capitalize"
              >{{ c.name }}</label
            >
          </div>          
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="sortLatest"
              name="checkboxsort"
              type="radio"
              value="latest"
              :checked="selectedSort === 'latest'"
              @change="handleSortChange"
            />
            <label for="sortLatest" class="text-xl title capitalize"
              >Sort by Latest</label
            >
          </div>
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="sortLowToHigh"
              name="checkboxsort"
              type="radio"
              value="lowToHigh"
              :checked="selectedSort === 'lowToHigh'"
              @change="handleSortChange"
            />
            <label for="sortLowToHigh" class="text-xl title capitalize"
              >Low to High</label
            >
          </div>
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="sortHighToLow"
              name="checkboxsort"
              type="radio"
              value="highToLow"
              :checked="selectedSort === 'highToLow'"
              @change="handleSortChange"
            />
            <label for="sortHighToLow" class="text-xl title capitalize"
              >High to Low</label
            >
          </div>
        </div>
      </aside>

      <div class="rightSideCards lg:w-[79%] w-[100%] lg:mt-0 mt-3">
        <div class="CardsFlexdiv flex fwrap lg:gap-x-4 gap-x-2 lg:gap-y-5 gap-y-2">
          <template v-if="loading">
            <ShimmereCard class="lg:block hidden" v-for="n in 4" :key="n" />
            <ShimmereCard class="lg:hidden block mt-4" v-for="n in 4" :key="n" />
          </template>
          <template v-else v-for="item in products" :key="item.id">
            <CommonCard
              :id="item.id"
              :title="item.name"
              :images="item.images[0].source"
              :price="item.mrp"
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
    justify-content: space-between;
  }
  .checkboxWrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -100%;
    z-index: 11;
    background: #fff;
    padding: 15px;
    &.active {
      bottom: 0;
    }
  }
}
</style>
