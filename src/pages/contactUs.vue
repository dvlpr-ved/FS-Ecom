<script setup lang="ts">
const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });

const formData = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
});

const submitForm = () => {
  console.log(formData.value);
};

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
    title: pageMeta.value.title || "Contact Us",
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
  <section class="staticPages contactpage afterBefore">
    <div class="imgdiv">
      <h2 class="text-5xl font-semibold text-white text-center pagesHeading afterBefore">
        Contact Us
      </h2>
    </div>
    <div class="container lg:py-5 py-4">
      <form @submit.prevent="submitForm" class="py-6 px-6 shadow-xl border rounded-lg">
        <div class="flexdiv flex flex-wrap gap-3">
          <div class="mb-4 w-3/3">
            <label for="name" class="block lg:text-xl text-sm title">Name:</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              class="inputField w-full p-2 px-0 text-xl"
            />
          </div>
          <div class="mb-4 w-3/3">
            <label for="email" class="block lg:text-xl text-sm title">Email:</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              class="inputField w-full p-2 px-0 text-xl"
            />
          </div>
          <div class="mb-4 w-3/3">
            <label for="phone" class="block lg:text-xl text-sm title">Phone No.:</label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              required
              class="inputField w-full p-2 px-0 text-xl"
            />
          </div>
          <div class="mb-4 w-full">
            <label for="address" class="block lg:text-xl text-sm title">Message:</label>
            <textarea
              id="address"
              v-model="formData.address"
              rows="3"
              required
              class="inputField w-full p-2 px-0 text-xl"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="submitButton bgblue80 py-3 px-8 text-xl text-white rounded-[50px] transition-all hover:opacity-[0.9] block w-fit mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contactpage {
  .inputField {
    border: 0;
    border-bottom: 1px solid #ddd;
  }
}
</style>
