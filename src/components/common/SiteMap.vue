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
    title: pageMeta.value.title || "My Orders",
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
    <!-- will useing this design later -->
    <!-- https://www.elegantthemes.com/blog/divi-resources/how-to-create-a-dynamic-html-sitemap-page-in-divi -->
    <div class="p-4 max-w-[800px] mx-auto">
      <h1 class="text-4xl font-bold text-orange-500">Sitemap</h1>
      <ul class="lg:py-4 py-2 pagesLink">
        <li class="flex flex-wrap gap-x-4 gap-y-2 items-center">
          <div class="w-full text-4xl capitalize">Pages</div>
          <NuxtLink to="/" class="hover:underline text-gray-600 text-[15px] capitalize">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:underline text-gray-600 text-[15px] capitalize">About US</NuxtLink>
          <NuxtLink to="/contactus" class="hover:underline text-gray-600 text-[15px] capitalize">contact US</NuxtLink>
          <NuxtLink to="/privacypolicy" class="hover:underline text-gray-600 text-[15px] capitalize">privacy & policy</NuxtLink>
          <NuxtLink to="/shippingpolicy" class="hover:underline text-gray-600 text-[15px] capitalize">shipping policy</NuxtLink>
          <NuxtLink to="/payment" class="hover:underline text-gray-600 text-[15px] capitalize">payment</NuxtLink>
          <NuxtLink to="/cancellation" class="hover:underline text-gray-600 text-[15px] capitalize">Cancellation Policy</NuxtLink>
          <NuxtLink to="/faq" class="hover:underline text-gray-600 text-[15px] capitalize">faq</NuxtLink>
          <NuxtLink to="/subscriptionplans" class="hover:underline text-gray-600 text-[15px] capitalize">subscription plans</NuxtLink>
          <NuxtLink to="#" class="hover:underline text-gray-600 text-[15px] capitalize">Our Servies</NuxtLink>
          <NuxtLink to="#" class="hover:underline text-gray-600 text-[15px] capitalize">Advertise</NuxtLink>
        </li>
      </ul>
      <ul class="lg:py-4 py-2 pagesLink">
        <li class="flex flex-wrap gap-x-4 gap-y-2 items-center">
          <div class="w-full text-4xl capitalize">product catagories</div>
          <NuxtLink to="/" class="hover:underline text-gray-600 text-[15px] capitalize">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:underline text-gray-600 text-[15px] capitalize">About US</NuxtLink>
          <NuxtLink to="/contactus" class="hover:underline text-gray-600 text-[15px] capitalize">contact US</NuxtLink>
          <NuxtLink to="/privacypolicy" class="hover:underline text-gray-600 text-[15px] capitalize">privacy & policy</NuxtLink>
          <NuxtLink to="/shippingpolicy" class="hover:underline text-gray-600 text-[15px] capitalize">shipping policy</NuxtLink>
          <NuxtLink to="/payment" class="hover:underline text-gray-600 text-[15px] capitalize">payment</NuxtLink>
          <NuxtLink to="/cancellation" class="hover:underline text-gray-600 text-[15px] capitalize">Cancellation Policy</NuxtLink>
          <NuxtLink to="/faq" class="hover:underline text-gray-600 text-[15px] capitalize">faq</NuxtLink>
          <NuxtLink to="/subscriptionplans" class="hover:underline text-gray-600 text-[15px] capitalize">subscription plans</NuxtLink>
          <NuxtLink to="#" class="hover:underline text-gray-600 text-[15px] capitalize">Our Servies</NuxtLink>
          <NuxtLink to="#" class="hover:underline text-gray-600 text-[15px] capitalize">Advertise</NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  
  <style lang="scss"></style
  

  