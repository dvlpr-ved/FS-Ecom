<script setup>
const visible = ref(false);
const SearchVisible = ref(false);

const authStore = useAuthStore();

const toogleModal = () => {
  if (!authStore.userData) {
    visible.value = true;
  }
};
const toggelSearchVisible = () => {
  SearchVisible.value = true;
};
const closeSearchVisible = () => {
  SearchVisible.value = false;
};
</script>
<template>
  <div class="spacer lg:hidden block py-[35px] bg-gray-200"></div>
  <footer
    class="fixedFooter lg:hidden block bg-white py-2 fixed bottom-0 left-0 right-0 w-full z-10"
  >
    <div class="container flex text-center justify-between gap-2">
      <NuxtLink to="../" class="block">
        <i class="pi pi-home"></i>
        <span class="text-sm block">Home</span>
      </NuxtLink>
      <NuxtLink to="#" class="block" @click="toggelSearchVisible">
        <i class="pi pi-search"></i>
        <span class="text-sm block">Search</span>
      </NuxtLink>
      <!-- <NuxtLink to="../blogs" class="block"> -->
      <NuxtLink to="../newproducts" class="block">
        <i class="pi pi-sync"></i>
        <span class="text-sm block">Update</span>
      </NuxtLink>
      <template v-if="!authStore.getUser">
        <span class="block" @click="toogleModal">
          <i class="pi pi-user"></i>
          <span class="text-sm block">My Account</span>
        </span>
      </template>
      <template v-else>
        <NuxtLink to="../myaccounts" class="block">
          <i class="pi pi-user"></i>
          <span class="text-sm block">My Account</span>
        </NuxtLink>
      </template>
      <NuxtLink to="../mycart" class="block">
        <i class="pi pi-shopping-cart"></i>
        <span class="text-sm block">Cart</span>
      </NuxtLink>
    </div>
  </footer>
  <LoginModal :visible="visible" />
  <template v-if="SearchVisible">
    <SearchFieldMobile :isSearchForMb="SearchVisible" :closeBtn="closeSearchVisible" />
  </template>
</template>
