<!-- ShimmereCard -->

<template>
    <div class="container py-4">
      <h1 class="text-3xl font-semibold mb-4">My Watchlist</h1>
  
      <!-- Show shimmer animation if watchlist is empty or loading -->
      <div v-if="isLoading || watchlist.length === 0">
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
        <!-- <p>No items in your watchlist.</p> -->
        
      </div>

      <div v-else>
        <div v-for="item in watchlist" :key="item.id"
          class="border rounded-lg p-4 mb-4 shadow-md flex items-center">
          <div class="flex-shrink-0">
            <img :src="item.image" alt="Watchlist Item Image" class="w-24 h-24 object-cover rounded-lg">
          </div>
          <div class="ml-4">
            <h2 class="text-lg font-semibold mb-2">{{ item.name }}</h2>
            <p class="text-gray-600 mb-1">Price: ${{ item.price.toFixed(2) }}</p>
            <p class="text-gray-600 mb-1">Last Updated: {{ item.lastUpdated }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const watchlist = ref([
    {
      id: 1,
      name: 'Product A',
      price: 250.0,
      image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg',
      lastUpdated: '2024-07-01'
    },
    {
      id: 2,
      name: 'Product B',
      price: 180.0,
      image: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg',
      lastUpdated: '2024-06-30'
    },
  ]);
  
  const isLoading = ref(true); 

    setTimeout(() => {
      isLoading.value = false;
    }, 2000);
  </script>
  
  <style scoped>
  .container {
    max-width: 650px;
  }
  </style>
  