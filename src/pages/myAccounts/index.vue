<script lang="ts" setup>
definePageMeta({
  layout: "myaccounts",
});

const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.isUserLoggedin) {
    navigateTo("/");
  }
});

</script>

<template>
  <EditProfile />
</template>

<style lang="scss">
.edit {
}
</style>
