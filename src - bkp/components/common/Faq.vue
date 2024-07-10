<template>
    <div class="faqMain py-12">
        <div class="max-w-3xl mx-auto px-[15px]">
            <h2 class="xl:text-3xl text-2xl font-semibold mb-6 text-center text-white">Frequently Asked Questions</h2>

            <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
                <button @click="toggle(index)"
                    class="flex justify-between items-center w-full p-4 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none">
                    <span>{{ faq.question }}</span>
                    <span v-if="openIndex === index" class="text-gray-600"><i class="pi pi-minus"></i></span>
                    <span v-else class="text-gray-600"><i class="pi pi-plus"></i></span>
                </button>
                <div v-if="openIndex === index" class="mt-2 p-4 bg-white rounded-md">
                    <p>{{ faq.answer }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const openIndex = ref(null);

const faqs = [
    {
        question: 'Which is the Best Platform for our eCommerce Startup?',
        answer: 'There are many well-known e-commerce website development platforms like Shopify, Magento, Drupal, WooCommerce, and others. All of these will help you in building the perfect eCommerce portal. However, every platform has its pros and cons. If you have a large business with tremendous data, Magento is the best choice for you.'
    },
    {
        question: 'How will my eCommerce Website be Visible to others Around the World?',
        answer: 'Once your website is developed by an eCommerce website designing company and is live, you will have to do the technical SEO, both on-page and off-page. This will give your eCommerce portal more visibility and growth. Also, remember SEO is going to be a constant process.'
    },
];

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index;
};
</script>

<style scoped>
.faqMain {
    background: url('https://img.freepik.com/free-photo/flat-lay-black-friday-tags-with-shopping-cart_23-2148285102.jpg') no-repeat center;
    background-size: cover;
    background-attachment: fixed;
    -webkit-background-attachment: fixed;
}

/* Tailwind CSS classes can be used directly here */
</style>
