<script setup>
const GetItemFromCart = useGetItemFromCart();

const cards = computed(() => GetItemFromCart.items || []);
const isLoading = computed(() => GetItemFromCart.isLoading);
const error = computed(() => GetItemFromCart.error);

onMounted(() => {
  GetItemFromCart.fetchGetItemFromCart();
});
</script>

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
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="p-9 w-[20%] animate-pulse rounded bg-gray-200"></div>
            <div class="w-[78%]">
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="p-9 w-[20%] animate-pulse rounded bg-gray-200"></div>
            <div class="w-[78%]">
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-200"
              ></span>
            </div>
          </div>
        </div>
      </template>
      <!-- <p>No items in your watchlist.</p> -->
    </div>

    <div v-else>
      <div
        v-for="items in cards"
        :key="items.id"
        class="bcards rounded-lg p-4 mb-4 shadow-md flex items-center"
      >
        <div class="flex-shrink-0">
          <img
            :src="
              items.images && items.images.length > 0
                ? items.images[0].source
                : 'https://via.placeholder.com/96'
            "
            alt="Product Image"
            class="w-24 h-24 object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        <div class="ml-4">
          <h2 class="text-lg font-semibold mb-2">{{ items.name }}</h2>
          <p class="text-gray-600 mb-1">{{ items.created_at }}</p>
          <p class="text-gray-600 mb-1">Price: ₹{{ items.mrp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 650px;
}
</style>
