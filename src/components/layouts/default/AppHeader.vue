<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchFromSanctum } from "/utils/sanctumApi.js";

// Store references
const cartstore = useCartStore();
const CartItems = computed(() => cartstore.getCartLength || "");

const getWishlistItems = useWishlistStore();
const wishlistd = computed(() => getWishlistItems.getWishlistLength || "");

// Search query and result management
const searchQuery = ref("");
const showAutoComplete = ref(false);
const searchResult = ref({
  catg: [],
  products: [],
  tagged: [],
});

// Config and route
const config = useRuntimeConfig();
const authStore = useAuthStore();
const route = useRoute();

// Modal visibility
const visible = ref(false);
const chatBoatVisible = ref(false);

// Function to check route and redirect if the user is not logged in
const checkRoute = () => {
  const myaccounts = route.path.toLowerCase().includes("myaccounts");
  const mycart = route.path.toLowerCase().includes("mycart");
  const wishlist = route.path.toLowerCase().includes("wishlist");
  const myorder = route.path.toLowerCase().includes("myorder");

  if ((myaccounts || mycart || wishlist || myorder) && !authStore.isUserLoggedin) {
    visible.value = true;
    navigateTo("/");
  }
};

watch(route, checkRoute(), { immediate: true });

// Handle search input blur
const handleBlur = () => {
  showAutoComplete.value = false;
};

// Fetch search results based on the query
const fetchSearchResult = async () => {
  const data = await fetchFromSanctum({
    method: "POST",
    url: `${
      config.API_BASE_URL || "https://Fashtsaly.com/API/public/"
    }api/fetchSearchResult`,
    body: { query: searchQuery.value },
  });

  if (data.success) {
    searchResult.value.catg = data.catg;
    searchResult.value.products = data.products;
    searchResult.value.tagged = data.tagged;
    showAutoComplete.value = true;
  }
};

// Watch the search query input for changes and fetch results
watch(searchQuery, (val) => {
  if (val && val.length > 2) {
    fetchSearchResult();
  }
});

// Close autocomplete suggestions
const closeAutoomplete = () => {
  showAutoComplete.value = false;
  searchQuery.value = "";
};

// Modal toggle functions
const closeModal = () => {
  visible.value = false;
};

const closeBoat = () => {
  chatBoatVisible.value = false;
};
const OpenBoat = () => {
  chatBoatVisible.value = !chatBoatVisible.value;
};

const toogleModal = () => {
  if (!authStore.isUserLoggedin) {
    visible.value = true;
  }
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <OfferLine />
  <!-- Header -->
  <header class="AppHeader border-bottom">
    <!-- Desktop Header -->
    <div class="headerDesk container lg:flex hidden justify-between">
      <div class="headerLeft flex justify-between items-center">
        <NuxtLink to="/" class="logo text text-5xl">Fashtsaly</NuxtLink>
      </div>
      <!-- Search Bar -->
      <div class="searchField lg:flex hidden relative">
        <input
          class="py-2 px-3 w-full border border-gray-300 rounded text-xl bg-gray-100"
          placeholder="Search Here..."
          v-model="searchQuery"
          @blur="handleBlur"
        />
        <div
          v-if="
            authStore.userData.is_paid_subscription ||
            authStore.userData.is_subscribed_user
          "
          class="UploadImageFromGallery w-[50px] absolute right-1 top-[6px] flex justify-center"
        >
          <searchByImage />
        </div>
        <SearchAutoComplete
          @close="closeAutoomplete"
          v-if="showAutoComplete"
          :results="searchResult"
        />
      </div>

      <!-- Navigation List -->
      <ul class="navList flex items-center justify-center capitalize gap-5">
        <li class="icons relative cart" v-tooltip="'View Cart'">
          <NuxtLink
            to="../mycart"
            class="border border-gray-300 rounded-[100%] flex items-center justify-center"
          >
            <i class="pi pi-shopping-cart text-2xl"></i>
            <span
              class="counter absolute top-[-5px] right-[-2px] text-orange-700 bg-white text-xl"
            >
              {{ CartItems ? CartItems : "" }}
            </span>
          </NuxtLink>
        </li>

        <li class="icons relative cart">
          <NuxtLink
            to="../wishlist"
            class="border border-gray-300 rounded-[100%] flex items-center justify-center"
          >
            <i class="pi pi-heart text-2xl"></i>
          </NuxtLink>
          <span
            class="counter absolute top-[-5px] right-[-2px] text-orange-700 bg-white text-xl"
          >
            {{ wishlistd ? wishlistd : "" }}
          </span>
        </li>

        <li class="block">
          <NuxtLink class="subscribe commonbtn text-xl" to="/subscriptionplans"
            >subscribe</NuxtLink
          >
        </li>

        <li
          class="icons relative user flex items-center gap-2 cursor-pointer"
          @click="toogleModal"
        >
          <template v-if="!authStore.isUserLoggedin">
            <i class="pi pi-user text-4xl"></i>
            <span class="text inline">LOGIN / REGISTER</span>
          </template>
          <NuxtLink to="/myaccounts" v-else class="text flex gap-2 items-center">
            <img src="~assets/images/users/user.png" class="h-10" />
            <p>
              <small v-if="authStore.getUser" class="block text-sm">welcome</small>
              {{ authStore.getUser ? authStore.getUser.name : "" }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Mobile Header -->
    <div class="container mx-auto flex items-center justify-between py-1 lg:hidden">
      <NuxtLink to="/" class="logo text text-3xl">Fashtsaly</NuxtLink>

      <ul class="navList flex items-center justify-center space-x-4">
        <li class="icons text-center cart">
          <template v-if="!authStore.getUser.name">
            <NuxtLink
              class="border border-gray-300 rounded-[100%] flex items-center justify-center"
              @click="toogleModal"
            >
              <img class="w-6" src="~assets/images/common/messenger.png" />
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              class="border border-gray-300 rounded-[100%] flex items-center justify-center"
              @click="OpenBoat"
            >
              <img class="w-6" src="~assets/images/common/messenger.png" />
            </NuxtLink>
          </template>
        </li>
        <li class="icons relative cart">
          <NuxtLink
            to="../wishlist"
            class="border border-gray-300 rounded-[100%] flex items-center justify-center"
          >
            <i class="pi pi-heart text-2xl"></i>
          </NuxtLink>
          <span
            class="counter absolute top-[-5px] right-[-2px] text-orange-700 bg-white text-xl"
          >
            {{ wishlistd ? wishlistd : "" }}
          </span>
        </li>
      </ul>
    </div>
  </header>

  <!-- Modal for Login/Signup -->
  <LoginModal :visible="visible" @closemodal="closeModal" :close="closeModal" />
  <chatBoat :chatBoatVisible="chatBoatVisible" @closeBoat="closeBoat" />
</template>

<style lang="scss" scoped>
.p-progressbar {
  display: none !important;
}

.AppHeader {
  padding: 8px 0;
  border-bottom: 1px solid var(--gray);
  position: relative;
  z-index: 12;
  background-color: #fff;

  &.active {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }

  .logo {
    font-size: 25px;
    color: var(--black);
  }

  .searchField {
    width: 35%;
    translate: 18% 0;
  }
}

.navList {
  .cart a {
    height: 45px;
    width: 45px;
  }
}

@media (max-width: 992px) {
  .headerLeft {
    border-bottom: 1px solid #ddd;
    width: 100%;
    margin-bottom: 15px;
    padding-bottom: 8px;
  }
}
</style>
