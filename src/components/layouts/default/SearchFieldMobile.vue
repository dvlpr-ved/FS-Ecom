<script lang="ts" setup>
const props = defineProps<{
  isSearchForMb: boolean;
  closeBtn: () => void;
}>();
const authStore = useAuthStore();
const handleChange = () => {};
const emit = defineEmits(["close"]);
const config = useRuntimeConfig();
const searchQuery = ref("");
watch(searchQuery, (val) => {
  if (val.length > 2) {
    fetchSearchResult();
  }
});
const searchResult = reactive({
  catg: [],
  products: [],
  tagged: [],
});
const showAutoComplete = ref(false);
const fetchSearchResult = async () => {
  const data = await fetchFromSanctum({
    method: "POST",
    url: `${
      config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
    }api/fetchSearchResult`,
    body: {
      query: searchQuery.value,
    },
  });
  const handleBlur = (e) => {
    showAutoComplete.value = false;
  };
  if (data.success) {
    searchResult.catg = data.catg;
    searchResult.products = data.products;
    searchResult.tagged = data.tagged;
    showAutoComplete.value = true;
  }
};
const closeModal = () => {
  searchQuery.value = "";
  showAutoComplete.value = false;
  emit("close");
};
</script>

<template>
  <div
    :isSearchForMb="isSearchForMb"
    class="SearchFieldMobile fixed bg-gray-100 top-0 left-0 right-0 bottom-0 h-[100%] w-full z-[12]"
  >
    <div class="flexdiv flex items-center bg-gray-100 relative">
      <input
        class="py-2 px-3 w-full border border-gray-300 rounded text-xl bg-gray-100"
        placeholder="Search Here..."
        v-model="searchQuery"
        @blur="handleBlur"
      />
      <div
        v-if="
          authStore.userData.is_paid_subscription || authStore.userData.is_subscribed_user
        "
        class="UploadImageFromGallery w-[50px] absolute right-1 top-[6px] flex justify-center"
      >
        <searchByImage />
      </div>
      <button class="cancelBtn text-blue-700 px-2 text-xl hidden" @click="closeBtn">
        close
      </button>
    </div>
    <CateGories :closeModal="closeModal" />
    <SearchAutoComplete
      @close="closeModal"
      v-if="showAutoComplete"
      :results="searchResult"
    />
  </div>
</template>

<style lang="scss">
.SearchFieldMobile {
  .autoCompleteDropDwon {
    box-shadow: unset;
  }
  .categories-main-div {
    display: block;
    .container {
      padding: 0;
    }
    .heading {
      display: none;
    }
  }
  .UploadImageFromGallery {
    .pi-camera {
      font-size: 25px !important;
    }
  }
}
</style>
