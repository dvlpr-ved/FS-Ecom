<script setup>
import { ref } from "vue";

const orders = ref([
  {
    id: 1,
    date: "2024-06-30",
    total: 150.0,
    product: {
      image: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
    },
    rating: 0,
    review: null,
  },
  {
    id: 2,
    date: "2024-06-28",
    total: 210.0,
    product: {
      image: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
    },
    rating: 0,
    review: null,
  },
]);

const isLoading = ref(true);
const activeOrderId = ref(null);

const toggleReviewForm = (orderId) => {
  activeOrderId.value = activeOrderId.value === orderId ? null : orderId;
};

const setRating = (orderId, rating) => {
  console.log(rating);

  const order = orders.value.find((o) => o.id === orderId);
  if (order) {
    order.rating = rating;
  }
};

const submitReview = (orderId) => {
  const order = orders.value.find((o) => o.id === orderId);
  if (order) {
    console.log("Submitting review:", {
      orderId: order.id,
      rating: order.rating,
      review: order.review,
    });
  }
};

setTimeout(() => {
  isLoading.value = false;
}, 500);
onMounted(() => {
  
});
</script>

<template>
  <div class="myordersmain py-5 bg-gray-100">
    <div class="myorder_inner container">
      <h1 class="text-3xl font-semibold mb-4 text-center">My Orders</h1>
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
      <!-- <p>No orders found.</p> -->
      <div v-else>
        <div
          v-for="order in orders"
          :key="order.id"
          class="border rounded-lg mb-2 shadow-md bg-white"
        >
          <div class="flexdiv flex p-4">
            <div class="flex-shrink-0">
              <img
                :src="order.product.image"
                alt="Product Image"
                class="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold mb-2">Order #{{ order.id }}</h2>
              <p class="text-gray-600 mb-1">Date: {{ order.date }}</p>
              <p class="text-gray-600 mb-1">Total: ₹ {{ order.total.toFixed(2) }}</p>
              <span
                class="rateText text-blue-800 font-bold capitalize cursor-pointer"
                @click="toggleReviewForm(order.id)"
              >
                {{ activeOrderId === order.id ? "close form" : "Rate & Review" }}
              </span>
            </div>
          </div>
          <div
            v-if="activeOrderId === order.id"
            class="rate-review px-4 py-3 border-t border-gray-400"
          >
            <div class="starRate">
              <p class="text-black text-xl mb-2">Rate product</p>
              <div class="starsdiv flex gap-3">
                <span
                  v-for="num in 5"
                  :key="num"
                  class="cursor-pointer"
                  :class="{
                    'text-orange-400': num <= order.rating,
                    'text-gray-500': num > order.rating,
                    'hover:text-yellow-400': num > order.rating,
                  }"
                  @click="setRating(order.id, num)"
                >
                  <i class="pi pi-star-fill text-2xl"></i>
                </span>
              </div>
            </div>
            <div class="reviewDesc mt-3">
              <p class="text-black text-xl mb-2">Review product</p>
              <textarea
                class="p-2 border border-gray-300 lg:min-h-[120px] text-xl"
                placeholder="Description"
                v-model="order.review"
              ></textarea>
            </div>
            <button
              class="commonbtn px-4 block w-fit m-auto mt-2 mr-0"
              @click="submitReview(order.id)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myorder_inner {
  max-width: 650px;
}
</style>
