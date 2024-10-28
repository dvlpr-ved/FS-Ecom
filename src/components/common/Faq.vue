<script setup>
import { ref, onMounted } from "vue";

const openIndex = ref(null);
const faqs = ref([]);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

onMounted(async () => {
  try {
    const response = await fetch("https://fashtsaly.com/API/public/api/WebsiteFaqs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    faqs.value = data.data;
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
  }
});
</script>

<template>
  {{ faqs.data }}
  <div class="faqMain">
    <h2 class="xl:text-3xl text-2xl font-semibold mb-6 text-center">
      Frequently Asked Questions
    </h2>

    <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
      <button
        @click="toggle(index)"
        class="flex justify-between items-center w-full p-4 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
      >
        <span class="text-xl">{{ faq.question }}</span>
        <span v-if="openIndex === index" class="text-gray-600"
          ><i class="pi pi-minus text-2xl"></i
        ></span>
        <span v-else class="text-gray-600"><i class="pi pi-plus text-2xl"></i></span>
      </button>
      <div v-if="openIndex === index" class="mt-2 p-4 bg-white rounded-md">
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.faqMain {
  // Add your styles here
}
</style>
