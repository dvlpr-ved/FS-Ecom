<script setup lang="ts">
import {fetchFromSanctum} from '/utils/sanctumApi.js'
const CartItems = ref(0);
const wishlistd = ref(2);
const wishlistItems = ref(2);
const NotiFication = ref(10);
const config = useRuntimeConfig();

const authStore = useAuthStore();
const showAutoComplete = ref(false);

const handleBlur = (e) => {
  // showAutoComplete.value = false;
};
const visible = ref(false);

const closeModal = () => {
  visible.value = false;
};
const toogleModal = () => {
  if (!authStore.userData) {
    visible.value = true;
  }
};

const GetItemFromCart = useGetItemFromCart();
const TotalcartItems = computed(() => GetItemFromCart.items || []);
onMounted(() => {
  GetItemFromCart.fetchGetItemFromCart();
});
watch(TotalcartItems, (newItems) => {
  CartItems.value = newItems.length;
});

const searchQuery = ref('');
watch(searchQuery , (val) => {
  if(val.length > 2){
    fetchSearchResult();
  }
});
const searchResult = reactive({
  catg : [],
  products : [],
  tagged : []
});
const fetchSearchResult =async () => { 
  const data =await fetchFromSanctum({method : 'POST' , 'url' : `${config.API_BASE_URL ? config.API_BASE_URL : 'https://fashtsaly.com/API/public/'}api/fetchSearchResult` , body : {
    query : searchQuery.value
  }});
  if(data.success){
    searchResult.catg = data.catg;
    searchResult.products = data.products;
    searchResult.tagged = data.tagged;
    showAutoComplete.value = true;
  }
}
</script>

<template>
  <OfferLine />
  <header class="AppHeader border-bottom">
    <!-- only for desktop -->
    <div class="headerDesk container lg:flex hidden justify-between">
      <div class="headerLeft flex justify-between items-center">
        <NuxtLink to="/" class="logo">
          <span class="text-3xl uppercase">fashtsaly</span>
        </NuxtLink>
      </div>

      <div class="searchField lg:flex hidden relative">
        <input
          class="py-2 px-3 w-full border border-gray-300 rounded text-xl bg-gray-100"
          placeholder="Search Here..."
          v-model="searchQuery"
          @blur="handleBlur"
        />
        <SearchAutoComplete v-if="showAutoComplete" :results="searchResult" />
      </div>

      <ul class="navList flex items-center justify-center capitalize gap-5">
        <li class="icons relative cart" v-tooltip="'View Cart'">
          <NuxtLink
            to="../mycart"
            class="border border-gray-300 rounded-[100%] flex items-center justify-center"
          >
            <i class="pi pi-shopping-cart text-2xl"></i>
            <span
              class="counter absolute top-[-5px] right-[-2px] text-orange-700 bg-white text-xl"
              >{{ CartItems }}</span
            >
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
            <!-- {{ wishlistd }} -->
            {{ CartItems }}
          </span>
        </li>
        <li class="block">
          <button class="subscribe commonbtn text-xl">subscribe</button>
        </li>
        <li
          class="icons relative user flex items-center gap-2 cursor-pointer"
          label="Show"
          @click="toogleModal"
        >
          <i class="pi pi-user text-4xl"></i>
          <span v-if="!authStore.getUser" class="text inline">LOGIN / REGISTER</span>
          <NuxtLink to="/myaccounts" v-else class="text inline">
            <small v-if="authStore.getUser" class="block text-sm">Hello</small>
            {{ authStore.getUser ? authStore.getUser.name : "" }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- header for mobile -->
    <div class="container mx-auto flex items-center justify-between py-1 lg:hidden">
      <NuxtLink to="/" class="logo">
        <span class="text-3xl uppercase font-bold">Fashtsaly</span>
      </NuxtLink>
      <ul class="navList flex items-center justify-center space-x-4">
        <li class="icons text-center cart">
          <NuxtLink
            to="../wishlist"
            class="border border-gray-300 rounded-[100%] flex items-center justify-center"
          >
            <img src="~assets/images/common/messenger.png" />
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
            >{{ CartItems }}</span
          >
        </li>
      </ul>
    </div>
  </header>

  <LoginModal :visible="visible" :close="closeModal" />
</template>

<style lang="scss" scoped>
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
