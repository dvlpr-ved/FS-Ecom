<script lang="ts" setup>
const editing = ref(false);
const NewAddress = ref(false);
const valueEdit = ref({});
function toggleEdit(data) {
  editing.value = !editing.value;
  valueEdit.value = data;
}
function toggleAddress() {
  NewAddress.value = !NewAddress.value;
}

const useGetAddressStore = useGetAddress();
const userAddress = computed(() => useGetAddressStore.userAddress || []);
const isLoading = computed(() => useGetAddressStore.isLoading);

onMounted(() => {
  useGetAddressStore.fetchUserAddress();
});
console.log("userAddress", userAddress);
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
        <addAddress :toggleAddress="toggleAddress" :isLoading="isLoading" />
      </template>
      <!-- add div -->
      <div v-if="!editing" class="cardwrapper flex flex-col-reverse">
        <template v-if="isLoading">
          <div class="shimmer p-9 animate-pulse rounded bg-gray-200 w-full"></div>
        </template>

        <template v-for="data in userAddress" :key="data.id">
          <div class="commondiv p-3 border mb-3">
            <div class="topFlex flex justify-between">
              <div class="userName flex lg:gap-5 gap-2 mb-2">
                <span class="font-[500] text-[15px] uppercase"
                  >Name : {{ data.name }}
                </span>
                <span class="font-[500] text-[15px] uppercase"
                  >Phone : {{ data.phone }}
                </span>
              </div>
              <div>
                <span
                  class="text-blue-700 font-[500] text-xl cursor-pointer"
                  @click="toggleEdit(data)"
                  >{{ editing ? "Cancel" : "Edit" }}</span
                >
              </div>
            </div>
            <div class="textAddress flex">
              <p class="text-[15px] capitalize">
                locality : {{ data.locality }}, city : {{ data.city }}
                <span class="font-[500] text-[15px]"> Pincode : {{ data.pincode }}</span>
              </p>
            </div>
          </div>
        </template>
      </div>
      <!-- add form -->
      <template v-else>
        <editAddress :editing="editing" :toggleEdit="toggleEdit" :data="valueEdit" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.manageAddress {
}
</style>
