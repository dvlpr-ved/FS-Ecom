<script lang="ts" setup>
const authStore = useAuthStore();

const logOut = () => {
  authStore.getUser.name = "";
  authStore.isLoggedin = false;
  localStorage.clear();
  window.location.reload();
  navigateTo(`/`);
};
</script>

<template>
  <aside class="accountsAsideBar lg:w-[24%] w-[100%]">
    <div class="lg:sticky lg:top-3">
      <div
        class="commonbox userAvtarInfo lg:p-3 p-2 bg-white shadow-sm rounded-sm lg:mb-3 lg:border-0 border-b border-gray-300"
      >
        <div class="flexdiv flex gap-3">
          <img
            class="w-[50px] h-[50px] rounded-full"
            src="~assets/images/users/user.png"
          />
          <div class="userInfo">
            <small class="welcMs block">welcome</small>
            <template v-if="!authStore.isLoggedin">
              <strong class="userName block text-xl headingsFont">User Name</strong>
            </template>
            <template v-else>
              <strong class="userName block text-xl headingsFont">{{
                authStore.getUser ? authStore.getUser.name : ""
              }}</strong>
            </template>
          </div>
        </div>
      </div>
      <div
        class="commonbox userAvtarInfo lg:p-3 p-2 bg-white shadow-sm rounded-sm lg:mb-3 lg:border-0 border-b border-gray-300"
      >
        <div class="headingLg lg:mb-3 mb-2 text-xl">My Activity</div>
        <NuxtLink
          to="/myorder"
          class="text-[15px] block capitalize mb-2 hover:text-orange-400"
          ><i class="pi pi-arrow-right"></i> My Orders
        </NuxtLink>

        <NuxtLink to="/wishlist" class="text-[15px] block capitalize hover:text-pink-500"
          ><i class="pi pi-heart"></i> wishlist
        </NuxtLink>
      </div>
      <div
        class="commonbox userAvtarInfo lg:p-3 p-2 bg-white shadow-sm rounded-sm lg:mb-3 lg:border-0 border-b border-gray-300"
      >
        <div class="headingLg lg:mb-3 mb-2 text-xl">Account Detail</div>
        <NuxtLink
          to="/myaccounts/editaddress"
          class="text-[15px] block capitalize mb-2 hover:text-orange-400"
          ><i class="pi pi-arrow-right"></i> Edit Profile
        </NuxtLink>
        <NuxtLink
          to="/myaccounts/address"
          class="text-[15px] block capitalize mb-1 hover:text-orange-400"
          ><i class="pi pi-arrow-right"></i> Manage Address
        </NuxtLink>
      </div>
      <div
        class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm lg:border-0 border-b border-gray-300"
      >
        <div class="headingLg text-xl cursor-pointer lg:text-center" @click="logOut">
          <i class="pi pi-sign-out text-xl"></i> Log Out
        </div>
      </div>
    </div>
  </aside>
</template>
<style lang="scss">
.commonbox {
}
</style>
