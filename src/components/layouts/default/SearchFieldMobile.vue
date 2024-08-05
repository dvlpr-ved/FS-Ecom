<script lang="ts" setup>
const props = defineProps<{
  isSearchForMb: boolean;
  closeBtn: () => void;
}>();
const handleChange = () => {};
</script>

<template>
  <div
    :isSearchForMb="isSearchForMb"
    class="SearchFieldMobile fixed bg-gray-100 top-0 left-0 right-0 bottom-0 h-[100%] w-full z-[12]"
  >
    <div class="flexdiv flex items-center bg-gray-100">
      <input
        class="py-3 px-3 w-[80%] border-0 rounded text-xl bg-transparent"
        placeholder="Search Here..."
        @click="handleChange"
      />
      <button class="cancelBtn text-blue-700 px-2 text-xl" @click="closeBtn">
        close
      </button>
    </div>
    <SearchAutoComplete />
  </div>
</template>

<style lang="scss">
.SearchFieldMobile {
  .autoCompleteDropDwon {
    box-shadow: unset;
  }
}
</style>
