<script lang="ts" setup>
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
    title: pageMeta.value.title || "Faq",
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
  <section class="staticPages afterBefore">
    <!-- <div class="imgdiv">
      <h2 class="text-5xl font-semibold text-white text-center pagesHeading afterBefore">
        Frequently Asked Questions
      </h2>
    </div> -->
    <div class="container lg:py-5 py-4">
      <!-- <h1 class="text-4xl font-bold mb-3 mt-2">Frequently Asked Questions</h1> -->
      <Faq />
    </div>
  </section>
</template>
