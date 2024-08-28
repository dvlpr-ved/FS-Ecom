<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <aside class="accountsAsideBar lg:w-[24%] w-[100%]">
    <div class="lg:sticky lg:top-3">
      <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm mb-3">
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
      <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm mb-3">
        <div class="headingLg mb-3 text-xl headingsFont">My Activity</div>
        <NuxtLink
        to="/"
          class="text-[15px] block capitalize mb-2 hover:text-orange-400"
          ><i class="pi pi-arrow-right"></i> My Orders
        </NuxtLink>

        <NuxtLink to="/wishlist" class="text-[15px] block capitalize hover:text-pink-500"
          ><i class="pi pi-heart"></i> wishlist
        </NuxtLink>
      </div>
      <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm mb-3">
        <div class="headingLg mb-3 text-xl headingsFont">Account Detail</div>
        <NuxtLink
          to="/myaccounts"
          class="text-[15px] block capitalize mb-2 hover:text-orange-400"
          ><i class="pi pi-arrow-right"></i> Edit Profile
        </NuxtLink>
        <NuxtLink
          to="/myaccounts/address"
          class="text-[15px] block capitalize mb-1 hover:text-orange-400"
          ><i class="pi pi-arrow-right"></i> Manage Address
        </NuxtLink>
      </div>
      <div class="commonbox userAvtarInfo p-3 bg-white shadow-sm rounded-sm lg:mb-0 mb-3">
        <div class="headingLg text-xl cursor-pointer text-center">
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
