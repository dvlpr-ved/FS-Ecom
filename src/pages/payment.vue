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
    title: pageMeta.value.title || "Payments",
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
    <div class="container lg:py-5 py-4">
      <div class="wrapContent">
        <h2 class="text-4xl font-bold my-4 text-center">Payment Policy</h2>
        <div class="leading-7">
          <p class="lg:text-justify lg:text-[16px] mb-4">
            At Fashtsaly, we strive to make our products and services available to as many
            customers as possible, while also ensuring that our payment policies are fair
            and transparent. As part of this commitment, we offer Cash on Delivery (COD)
            as a payment option for regular resellers/customers only.
          </p>
          <p class="lg:text-justify lg:text-[16px] mb-4">
            Regular resellers are those who have established a business relationship with
            our company and have a history of timely payments and reliable business
            practices. We trust all resellers/customers and believe that they deserve the
            convenience of COD as a payment option. But We take fraud prevention and
            financial security very seriously, and we work hard to ensure that all
            transactions are safe and secure, and we strive to provide payment options
            that are convenient and secure for everyone.
          </p>
          <p class="lg:text-justify lg:text-[16px] mb-4">
            For other new customers, we offer a variety of payment options, including
            credit card, bank transfer, and online payment platforms. We understand that
            all customers are able to use COD,
          </p>
          <p class="lg:text-justify lg:text-[16px] mb-4">
            Our payment policies are designed to protect both our customers and our
            company. If you have any questions about our payment policies or the payment
            options available to you, please don’t hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.container {
}
</style>
