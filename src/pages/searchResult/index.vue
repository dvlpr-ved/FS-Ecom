<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);
const loading = ref(true);
const isMobileNavVisible = ref("");

const getDataFunc = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products.value = data.products;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const openFilter = () => {
  isMobileNavVisible.value = "active";
};
const closeFilter = () => {
  isMobileNavVisible.value = "";
};

onMounted(async () => {
  getDataFunc();
});
</script>

<template>
  <div class="SearchResultPage py-4">
    <div class="container flex flex-wrap justify-between">
      <aside
        class="LeftFilters lg:w-[20%] w-[100%] bg-gray-100 lg:sticky py-2 h-[fit-content] top-2"
      >
        <div
          class="flexdiv fixinMb lg:block flex justify-between lg:border-b px-4 py-2 lg:mb-3"
        >
          <h1 class="text-3xl">Filters</h1>
          <button class="lg:hidden filterBtn" @click="openFilter()">
            <i class="pi pi-filter text-3xl"></i>
          </button>
        </div>
        <div :class="['overlay', isMobileNavVisible]" @click="closeFilter()"></div>
        <div :class="['checkboxWrapper px-4 transition-all', isMobileNavVisible]">
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="checkboxes"
              type="checkbox"
              value="value"
              checked
            />
            <label for="checkboxes" class="text-xl title">All Catagories</label>
          </div>
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="checkboxes0"
              type="checkbox"
              value="value"
            />
            <label for="checkboxes0" class="text-xl title">Sarees</label>
          </div>
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="checkboxes1"
              type="checkbox"
              value="value"
            />
            <label for="checkboxes1" class="text-xl title">Lehanga</label>
          </div>
          <div class="checkbox mb-3">
            <input
              class="styled-checkbox"
              id="checkboxes2"
              type="checkbox"
              value="value"
            />
            <label for="checkboxes2" class="text-xl title">Kurti</label>
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
