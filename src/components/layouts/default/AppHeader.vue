<script setup lang="ts">
const CartItems = ref(12);
const whitelistItems = ref(2);
const NotiFication = ref(10);

const authStore = useAuthStore();
const showAutoComplete = ref(false);
const handleChange = (e: any) => {
  // showAutoComplete.value = !showAutoComplete.value;
  showAutoComplete.value = true;
};
const handleBlur = () => {
  showAutoComplete.value = false;
};
const visible = ref(false);

const closeModal = () => {
  visible.value = false;
};
</script>

<template>
  <OfferLine />
  <header class="AppHeader border-bottom">
    <!-- only for desktop -->
    <div class="headerDesk container lg:flex hidden justify-between">
      <div class="headerLeft flex justify-between items-center">
        <a href="/" class="logo">
          <span class="text-3xl uppercase">fashtsaly</span>
        </a>
      </div>

      <div class="searchField lg:flex hidden relative">
        <input placeholder="Search Here..." @click="handleChange" @blur="handleBlur" />
        <SearchAutoComplete v-if="showAutoComplete" />
      </div>

      <ul class="navList flex items-center justify-center capitalize gap-5">
        <li class="icons relative cart" v-tooltip="'View Cart'">
          <NuxtLink
            to="../orders"
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
            to="../whitelist"
            class="border border-gray-300 rounded-[100%] flex items-center justify-center"
          >
            <i class="pi pi-heart text-2xl"></i>
          </NuxtLink>
        </li>
        <li class="block"><button class="subscribe commonbtn text-xl">subscribe</button></li>
        <li
          class="icons relative user flex items-center gap-2 cursor-pointer"
          label="Show"
          @click="visible = true"
        >
          <i  class="pi pi-user text-4xl"></i>
          <span v-if="!authStore.isLoggedin" class="text inline">LOGIN / REGISTER</span>
          <span v-else class="text inline">{{authStore.getUser ? authStore.getUser.name : ''}}</span>
        </li>
      </ul>
    </div>

    <!-- header for mobile -->
    <div class="container mx-auto flex items-center justify-between py-1 lg:hidden">
      <a href="/" class="logo">
        <span class="text-3xl uppercase font-bold">Fashtsaly</span>
      </a>
      <ul class="navList flex items-center justify-center space-x-4">
        <li class="icons text-center watchlist">
          <NuxtLink
            to="whitelist"
            class="flex flex-col items-center text-gray-700 hover:text-gray-900"
          >
            <i class="pi pi-bookmark text-2xl"></i>
            <span class="text-xs mt-1">Whitelist</span>
          </NuxtLink>
        </li>
        <li class="icons text-center notification">
          <div class="flex flex-col items-center text-gray-700 hover:text-gray-900">
            <i class="pi pi-bell text-2xl"></i>
            <span class="text-xs mt-1">Notification</span>
          </div>
        </li>
        <li class="icons text-center subscribe">
          <div class="flex flex-col items-center text-gray-700 hover:text-gray-900">
            <i class="pi pi-envelope text-2xl"></i>
            <span class="text-xs mt-1">Subscribe</span>
          </div>
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
  z-index: 9;
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

    input {
      width: 100%;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 18px;
      border-color: gainsboro;
      /*&:focus {
                box-shadow: 0 0 10px 12000px rgba(0, 0, 0, 0.39);
            }*/
    }
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
