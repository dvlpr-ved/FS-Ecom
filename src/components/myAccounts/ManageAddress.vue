<script lang="ts" setup></script>

<template>
  <div class="manageAddress">
    <div class="contentdiv flex justify-center items-center h-full relative z-20">
      <div class="inner_div bg-white p-5 max-w-[700px] w-full">
        <h5 class="text-2xl text-center mb-3">Manage Addresses</h5>
        <div class="commondiv p-3 border mb-3 cursor-pointer">
          <h5 class="text-xl" style="color: var(--text-blue)">
            <i class="pi pi-plus"></i> Add a New Addresses
          </h5>
        </div>
        <!-- address div -->
        <div class="commondiv p-3 border mb-3">
          <div class="userName flex lg:gap-5 gap-2 mb-2">
            <span class="font-[500] text-[15px] uppercase">user name </span>
            <span class="font-[500] text-[15px] uppercase">0999999999 </span>
          </div>
          <div class="textAddress flex">
            <p class="text-[15px]">
              1 26M, DDA Flats Pocket 1, New Kondli, 1 26M, DDA Flats Pocket 1, New
              Kondli, New Delhi, Delhi -
              <span class="font-[500] text-[15px]">105599</span>
            </p>
          </div>
        </div>
        <!-- address two -->
        <div class="commondiv p-3 border mb-3">
          <div class="userName flex lg:gap-5 gap-2 mb-2">
            <span class="font-[500] text-[15px] uppercase">user name </span>
            <span class="font-[500] text-[15px] uppercase">0999999999 </span>
          </div>
          <div class="textAddress flex">
            <p class="text-[15px]">
              1 26M, DDA Flats Pocket 1, New Kondli, 1 26M, DDA Flats Pocket 1, New
              Kondli, New Delhi, Delhi -
              <span class="font-[500] text-[15px]">105599</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.manageAddress {
}
</style>
