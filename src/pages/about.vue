<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from 'vue';

const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });

onMounted(async () => {
  await metadataStore.fetchMetaData();
  pageMeta.value = metadataStore.getPageMeta(route.path);
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
    title: pageMeta.value.title || 'Default Title',
    meta: [
      {
        name: 'description',
        content: pageMeta.value.description || 'Online Shopping Site for Reselling Products',
      },
      {
        name: 'keywords',
        content: pageMeta.value.meta_tags?.join(', ') || 'Online Shopping Site for Reselling Products',
      },
    ],
  });
});
</script>


<template>
  <section class="staticPages afterBefore">
    <div class="imgdiv">
      <h2 class="text-5xl font-semibold text-white text-center pagesHeading afterBefore">
        About Us
      </h2>
    </div>

    {{ pageMeta.title }}
    <br />
    {{ pageMeta.description }}

    <div class="container lg:py-5 py-4">
      <!-- <div class="text-4xl font-bold mb-3 mt-2">How we are different from others?</div> -->
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          Welcome to Fashtsaly, We are a B2B & B2C e-commerce platform that connects
          wholesalers, resellers, and customers directly with manufacturers. This is the
          premier destination for resellers & wholesalers looking to grow their business
          and increase their profitability
        </p>
        <div class="text-4xl font-bold mb-3 mt-3">Our Story</div>
        <p class="lg:text-justify lg:text-[16px]">
          We started our reselling business in 2022. To start any business, having the
          right product is crucial. We needed reliable suppliers who could provide us with
          products for online selling and also have stock available. So, we began
          searching for manufacturers and suppliers both offline and online.
        </p>
        <p class="lg:text-justify lg:text-[16px]">
          During our search, we found some great manufacturers and suppliers, but we also
          encountered some fake ones, which led to some losses. As our business grew, we
          started getting inquiries from regular customers about products that we didn’t
          have in stock. Some inquiries were for products we did have, but due to a large
          collection, we couldn't respond to every inquiry efficiently. This limited our
          sales growth.
        </p>
        <p class="lg:text-justify lg:text-[16px]">
          That’s when we decided to create a platform where resellers and wholesalers can
          easily access a wide range of branded, macro-branded, and manufacturer products
          in just one click. This platform allows them to find the products they need,
          solve their inquiries easily, and start or grow their businesses by joining us.
        </p>

        <div class="text-4xl font-bold mb-3 mt-3">Why Reselling?</div>
        <p class="lg:text-justify lg:text-[16px]">
          Reselling is a powerful business model for learning and growth. It enables you
          to develop a range of valuable skills, including brand building, customer
          communication, digital marketing, social media marketing (SMM), influencer
          partnerships, sales techniques, and content creation. By engaging in reselling,
          you can establish a solid foundation in these areas while scaling your business.
        </p>
        <div class="text-4xl font-bold mb-3 mt-3">Our Vision</div>
        <p class="lg:text-justify lg:text-[16px]">
          Our vision is to build largest community of entrepreneurs and create job
          opportunities across these dynamic fields. We aim to empower individuals to
          succeed and thrive in today’s competitive market.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>