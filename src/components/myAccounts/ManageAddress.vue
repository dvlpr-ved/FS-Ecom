<script lang="ts" setup>
const editing = ref(false);
const NewAddress = ref(false);
function toggleEdit() {
  editing.value = !editing.value;
}
function toggleAddress() {
  NewAddress.value = !NewAddress.value;
}

const useGetAddressStore = useGetAddress();
const userData = computed(() => useGetAddressStore.userAddress || []);

onMounted(() => {
  useGetAddressStore.fetchUserAddress();
});
console.log("userData", userData);
</script>

<template>
  <div class="manageAddress">
    <div class="inner_div bg-gray-50 p-5">
      <h5 class="text-2xl text-center mb-4">Manage Addresses</h5>
      <template v-if="!NewAddress"
        ><div
          class="commondiv p-3 border border-gray-500 mb-4 cursor-pointer"
          @click="toggleAddress"
        >
          <h5 class="text-xl" style="color: var(--text-blue)">
            <i class="pi pi-plus"></i> Add a New Addresses
          </h5>
        </div></template
      >
      <template v-else>
        <h5 class="text-xl p-3" style="color: var(--text-blue)">Add Addresses</h5>
      </template>

      <template v-if="NewAddress">
        <addAddress :toggleAddress="toggleAddress" />
      </template>
      <!-- add div -->
      <div v-if="!editing" class="commondiv p-3 border mb-3 mt-3">
        <div class="topFlex flex justify-between">
          <div class="userName flex lg:gap-5 gap-2 mb-2">
            <span class="font-[500] text-[15px] uppercase">user name </span>
            <span class="font-[500] text-[15px] uppercase">0999999999 </span>
          </div>
          <div>
            <span
              class="text-blue-700 font-[500] text-xl cursor-pointer"
              @click="toggleEdit"
              >{{ editing ? "Cancel" : "Edit" }}</span
            >
          </div>
        </div>
        <div class="textAddress flex">
          <p class="text-[15px]">
            1 26M, DDA Flats Pocket 1, New Kondli, 1 26M, DDA Flats Pocket 1, New Kondli,
            New Delhi, Delhi -
            <span class="font-[500] text-[15px]">105599</span>
          </p>
        </div>
      </div>
      <!-- add form -->
      <template v-else>
        <editAddress :editing="editing" :toggleEdit="toggleEdit" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.manageAddress {
}
</style>
