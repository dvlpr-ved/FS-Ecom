<script setup></script>
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
      <NuxtLink to="#" class="block">
        <i class="pi pi-search"></i>
        <span class="text-sm block">Search</span>
      </NuxtLink>
      <NuxtLink to="../blogs" class="block">
        <i class="pi pi-sync"></i>
        <span class="text-sm block">Update</span>
      </NuxtLink>
      <NuxtLink to="../myaccounts" class="block">
        <i class="pi pi-user"></i>
        <span class="text-sm block">My Account</span>
      </NuxtLink>
      <NuxtLink to="#" class="block">
        <i class="pi pi-shopping-cart"></i>
        <span class="text-sm block">Cart</span>
      </NuxtLink>
    </div>
  </footer>
</template>