<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });
const toast = useToast();

const show = (message) => {
  toast.add({ severity: "success", detail: message, life: 3000 });
};

const errMsg = ref("");
const is_submitting = ref(false);

const formData = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const validateForm = () => {
  return Object.values(formData.value).every((value) => value.trim() !== "");
};

const submitForm = async () => {
  if (!validateForm()) {
    errMsg.value = "All fields are required";
    return;
  }
  is_submitting.value = true;
  try {
    const url = "https://fashtsaly.com/API/public/api/submitQuery";
    const data = await fetchFromSanctum({
      url: url,
      method: "POST",
      body: {
        name: formData.value.name,
        email: formData.value.email,
        phone: formData.value.phone,
        message: formData.value.message,
      },
    });
    show("Details captured we will contact you shortly");
    is_submitting.value = false;
    formData.value.name = "";
    formData.value.email = "";
    formData.value.phone = "";
    formData.value.message = "";
    errMsg.value = "";
  } catch (error) {
    is_submitting.value = false;
    errMsg.value = `we'r facing some network ussue please try after some time`;
  }
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
  <Toast />
  <section class="staticPages contactpage afterBefore">
    <div class="imgdiv">
      <h2 class="text-5xl font-semibold text-white text-center pagesHeading afterBefore">
        Contact Us
      </h2>
    </div>
    <div class="container lg:py-5 py-4">
      <div class="errorMsg text-center text-[#dc2626]">
        {{ errMsg }}
      </div>
      <form @submit.prevent="submitForm" class="py-6 px-6 shadow-xl border rounded-lg">
        <div class="flexdiv flex flex-wrap gap-3">
          <div class="mb-4 w-3/3">
            <label for="name" class="block lg:text-xl text-sm title">Name:</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="inputField w-full p-2 px-0 text-xl"
            />
          </div>
          <div class="mb-4 w-3/3">
            <label for="email" class="block lg:text-xl text-sm title">Email:</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="inputField w-full p-2 px-0 text-xl"
            />
          </div>
          <div class="mb-4 w-3/3">
            <label for="phone" class="block lg:text-xl text-sm title">Phone No.:</label>
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="inputField w-full p-2 px-0 text-xl"
            />
          </div>
          <div class="mb-4 w-full">
            <label for="address" class="block lg:text-xl text-sm title">Message:</label>
            <textarea
              id="address"
              v-model="formData.message"
              rows="3"
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
