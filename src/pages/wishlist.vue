<script setup>
const getWishlistItems = useWishlistStore();
const wishlistd = computed(() => getWishlistItems.getWishlistLength || "");

const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });

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
    title: pageMeta.value.title || "My Wishlist",
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
  <MyWhitelist />
  <MostViewdProducts v-if="wishlistd == 0" />
</template>
