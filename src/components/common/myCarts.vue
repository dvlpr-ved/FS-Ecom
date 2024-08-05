<script setup>
import { template } from "@whoj/utils";
import { ref } from "vue";

const GetItemFromCart = useGetItemFromCart();

const cards = computed(() => GetItemFromCart.items || []);
const isLoading = computed(() => GetItemFromCart.isLoading);
const error = computed(() => GetItemFromCart.error);

onMounted(() => {
  GetItemFromCart.fetchGetItemFromCart();
});
</script>

<template>
  <div class="myordersmain bg-gray-200 py-5">
    <div class="myorder_inner container">
      <h1 class="text-3xl font-semibold mb-4 text-center">My Cart</h1>

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

      <template v-else-if="cards.length === 0">
        <div class="text-center">
          <p class="text-2xl border p-2 px-3 w-fit m-auto mb-2">No Item found.</p>
          <NuxtLink to="../" class="text-3xl text-blue-600">Explore Product</NuxtLink>
        </div>
      </template>

      <template v-else>
        <div class="cardsflex flex flex-wrap justify-between relative">
          <div class="cardsWrapper bg-white lg:w-[60%] w-[100%]">
            <div
              v-for="items in cards"
              :key="items.id"
              class="bcards py-2 border-b border-b-300 lg:p-3 p-2"
            >
              <div class="bcards_inner flex lg:gap-4 gap-3">
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
                    <h2 class="text-lg font-semibold mb-2">{{ items.name }}</h2>
                    <p class="text-gray-600 mb-1">{{ items.created_at }}</p>
                    <p class="text-gray-600 mb-1">Price: ₹{{ items.mrp }}</p>
                  </div>
                  <div class="flexbtn flex gap-5 lg:mt-3 mt-2">
                    <button class="bg-[#e53535] text-white py-1 px-3 rounded">
                      Remove
                    </button>
                    <button class="bgorange text-white py-1 px-3 rounded">
                      Buy This
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="priceTable bg-white lg:w-[35%] w-[100%] lg:mt-0 mt-3 h-fit sticky top-5">
            <h5 class="text-2xl text-gray-700 border-b border-b-gray-300 p-3">
              Price details
            </h5>
            <div class="flexPrice flex justify-between p-3">
              <span class="text-xl">Price (2 Items)</span>
              <span class="text-xl text-gray-800">₹ 2000</span>
            </div>
            <div class="flexPrice flex justify-between p-3">
              <span class="text-xl">Discount</span>
              <span class="text-xl text-green-600">- ₹ 300</span>
            </div>
            <div class="flexPrice flex justify-between border-b border-b-gray-300 p-3">
              <span class="text-xl">Delivery Charges</span>
              <span class="text-xl text-gray-800"> ₹ 40 </span>
            </div>
            <div class="flexPrice flex justify-between border-b border-b-gray-300 p-3">
              <span class="text-xl font-bold">Total Amount</span>
              <span class="text-xl text-gray-800 font-bold"> ₹ 2000 </span>
            </div>
            <p class="text-xl p-3">Your Saving <span class="text-xl text-green-600">₹1,737</span> on this order</p>
            <button class="px-4 py-2 text-2xl bgorange text-white w-full">Place Order</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.myorder_inner {
  max-width: 1024px;
}
</style>
