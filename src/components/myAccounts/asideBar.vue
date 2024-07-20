<script lang="ts" setup>
const visibleAddressModal = ref(false);
const closeAddressModal = () => {
  visibleAddressModal.value = false;
};
</script>

<template>
  <aside class="accountsAsideBar lg:w-[24%] w-[100%]">
    <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm mb-3">
      <div class="flexdiv flex gap-3">
        <img class="w-[50px] h-[50px] rounded-full" src="~assets/images/users/user.png" />
        <div class="userInfo">
          <small class="welcMs block">welcome</small>
          <strong class="userName block text-xl headingsFont">User Name</strong>
        </div>
      </div>
    </div>
    <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm mb-3">
      <div class="headingLg mb-3 text-xl headingsFont">My Activity</div>
      <nuxt-link
        to="orders"
        class="text-[15px] block capitalize mb-2 hover:text-orange-400"
        ><i class="pi pi-arrow-right"></i> My Orders
      </nuxt-link>

      <nuxt-link to="whitelist" class="text-[15px] block capitalize hover:text-pink-500"
        ><i class="pi pi-heart"></i> Whitelist
      </nuxt-link>
    </div>
    <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm mb-3">
      <div class="headingLg mb-3 text-xl headingsFont">Account Detail</div>
      <nuxt-link to="#" class="text-[15px] block capitalize mb-2 hover:text-orange-400"
        ><i class="pi pi-arrow-right"></i> Edit Profile
      </nuxt-link>
      <li label="Show" @click="props.visibleAddressModal = true" class="py-5">
        open modal
      </li>
      <nuxt-link to="#" class="text-[15px] block capitalize mb-1 hover:text-orange-400"
        ><i class="pi pi-arrow-right"></i> Manage Address
      </nuxt-link>
    </div>
    <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm">
      <div class="headingLg text-xl cursor-pointer text-center">
        <i class="pi pi-sign-out text-xl"></i> Log Out
      </div>
    </div>
  </aside>
  <!-- <addressesModal :visible="visibleAddressModal" @close="visibleAddressModal = false" /> -->
</template>
<style lang="scss">
.commonbox {
}
</style>
