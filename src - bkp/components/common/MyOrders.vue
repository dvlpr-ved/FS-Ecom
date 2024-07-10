<template>
    <div class="myordersmain container py-5">
        <h1 class="text-3xl font-semibold mb-4">My Orders</h1>
        <template v-if="isLoading">
            <div class="shimmermain space-y-4">
                <div class="flex justify-between">
                  <div class="p-9 w-[20%] animate-pulse rounded bg-gray-200"></div>
                  <div class="w-[78%]">
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="p-9 w-[20%] animate-pulse rounded bg-gray-200"></div>
                  <div class="w-[78%]">
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <div class="p-9 w-[20%] animate-pulse rounded bg-gray-200"></div>
                  <div class="w-[78%]">
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                    <span class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"></span>
                  </div>
                </div>
              </div>
        </template>
        <!-- <p>No orders found.</p> -->
        <div v-else>
            <div v-for="order in orders" :key="order.id" class="border rounded-lg p-4 mb-4 shadow-md flex items-center">
                <div class="flex-shrink-0">
                    <img :src="order.product.image" alt="Product Image" class="w-24 h-24 object-cover rounded-lg">
                </div>
                <div class="ml-4">
                    <h2 class="text-lg font-semibold mb-2">Order #{{ order.id }}</h2>
                    <p class="text-gray-600 mb-1">Date: {{ order.date }}</p>
                    <p class="text-gray-600 mb-1">Total: ${{ order.total.toFixed(2) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { template } from '@whoj/utils';
import { ref } from 'vue';

const orders = ref([
    {
        id: 1, date: '2024-06-30',
        total: 150.0,
        product: { image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg' }
    },
    {
        id: 2,
        date: '2024-06-28',
        total: 210.0,
        product: { image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg' }
    },
]);

const isLoading = ref(true)

setTimeout(() => {
    isLoading.value = false;
}, 2000);
</script>

<style scoped>
.myordersmain {
    max-width: 650px;
}
</style>
