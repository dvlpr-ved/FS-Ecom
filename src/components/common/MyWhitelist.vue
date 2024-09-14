<script setup>
const ApiGetWhishlistItems = useWishlistStore();
const cards = computed(() => ApiGetWhishlistItems.getWishlist || []);
const isLoading = ref(true);

const RemoveItemFromCart = async (product_id) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to remove this item from the Wishlist?"
  );
  if (isConfirmed) {
    const res = await ApiGetWhishlistItems.fetchRemoveWishlist({ product_id });
    if (res) {
      ApiGetWhishlistItems.fetchWishlistItems();
      console.log("Item removed");
    } else {
      console.error("Error in Removing Item From Wishlist");
    }
  }
};

onMounted(() => {
  ApiGetWhishlistItems.fetchWishlistItems();
  isLoading.value = false;
});
</script>

<template>
  <div class="myordersmain bg-gray-200 py-5">
    <div class="myorder_inner container">
      <h1 class="text-3xl font-semibold mb-4 text-center">My Wishlist</h1>

      <template v-if="isLoading">
        <div class="shimmermain space-y-4">
          <div class="flex justify-between">
            <div class="p-9 w-[20%] animate-pulse rounded bg-gray-500"></div>
            <div class="w-[78%]">
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="p-9 w-[20%] animate-pulse rounded bg-gray-500"></div>
            <div class="w-[78%]">
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="p-9 w-[20%] animate-pulse rounded bg-gray-500"></div>
            <div class="w-[78%]">
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
              <span
                class="p-3 block mb-1 w-full animate-pulse rounded bg-gray-500"
              ></span>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="cards.length === 0">
        <div class="text-center">
          <div class="iconimg">
            <i class="pi pi-heart text-8xl text-gray-500"></i>
          </div>
          <p class="text-2xl border p-2 px-3 w-fit m-auto mb-2">No Item found.</p>
          <NuxtLink to="../" class="text-3xl text-blue-600">Explore Product</NuxtLink>
        </div>
      </template>

      <template v-else>
        <div class="cardsWrapper bg-white">
          <div
            v-for="items in cards"
            :key="items.id"
            class="bcards py-2 border-b border-b-300 lg:p-3 p-2"
          >
            <div class="cardwishlist relative">
              <NuxtLink
                :to="`searchresult/${items.id}`"
                class="bcards_inner flex lg:gap-4 gap-3"
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
                <div class="contentdiv">
                  <div class="topconten">
                    <div class="text-lg font-semibold mb-2">{{ items.name }}</div>
                    <p class="text-gray-600 mb-1">{{ items.created_at }}</p>
                    <p class="text-gray-600 mb-1">
                      Price: ₹{{ getPrice(items.price, items.price_subscribed) }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
              <button
                class="absolute top-0 right-0 text-gray-600 z-1"
                @click="RemoveItemFromCart(items.id)"
              >
                <i class="pi pi-trash text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.myorder_inner {
  max-width: 650px;
}
</style>
