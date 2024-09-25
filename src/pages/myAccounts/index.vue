<script lang="ts" setup>
definePageMeta({
  layout: "myaccounts",
});

const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });

const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.isUserLoggedin) {
    navigateTo("/");
  }
});

watch(
  () => route.path,
  async () => {
    await metadataStore.fetchMetaData();
    pageMeta.value = metadataStore.getPageMeta(route.path);
  },
  { immediate: true }
);

watchEffect(() => {
  useHead({
    title: pageMeta.value.title || "My Accounts",
    meta: [
      {
        name: "description",
        content:
          pageMeta.value.description || "Online Shopping Site for Reselling Products",
      },
      {
        name: "keywords",
        content:
          pageMeta.value.meta_tags?.join(", ") ||
          "Online Shopping in India, online Shopping store, Online Shopping Site, Buy Online, Shop Online, Online",
      },
    ],
  });
});
</script>

<template>
  <div class="lg:block hidden">
    <EditProfile />
  </div>
</template>

<style lang="scss">
.edit {
}
</style>
