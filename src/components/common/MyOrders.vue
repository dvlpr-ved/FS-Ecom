<script setup>
import { ref, onMounted } from "vue";

// const orders = ref([
//   {
//     id: 1,
//     date: "2024-06-30",
//     total: 150.0,
//     product: {
//       image: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
//     },
//     rating: 0,
//     review: null,
//   },
//   {
//     id: 2,
//     date: "2024-06-28",
//     total: 210.0,
//     product: {
//       image: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
//     },
//     rating: 0,
//     review: null,
//   },
// ]);

const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });

const isLoading = ref(true);
const activeOrderId = ref(null);

const toggleReviewForm = (orderId) => {
  activeOrderId.value = activeOrderId.value === orderId ? null : orderId;
};

const setRating = (orderIndex, productId, rating) => {
  const order = order_data.value[orderIndex];
  if (order) {
    const productIndex = order.products.findIndex((p) => p.product_id === productId);
    if (productIndex !== -1) {
      order_data.value[orderIndex].products[productIndex].rating = rating;
      console.log(order_data.value[orderIndex].products[productIndex]);
    }
  }
};

const submitReview = async (order_detail) => {
  const submit = await fetchFromSanctum({
    url: "https://fashtsaly.com/API/public/api/submitReview",
    method: "POST",
    body: {
      details: order_detail,
    },
  });
  if (submit.success) {
    alert("Review submitted successfully");
  } else {
    alert("Failed to submit");
  }
  activeOrderId.value = null;
};

const order_data = ref([]);
const getData = async () => {
  const data = await fetchFromSanctum({
    url: "https://fashtsaly.com/API/public/api/getOrders",
    method: "GET",
  });
  if (data.success) {
    isLoading.value = false;
    console.log(data);
    order_data.value = data.data;
  }
};

// Fetch data on component mount
onMounted(() => {
  getData();
});

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
    title: pageMeta.value.title || "Online Shopping Site for Reselling Products",
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
  <div class="myordersmain py-5 bg-gray-100">
    <div class="myorder_inner container">
      <h1 class="text-3xl font-semibold mb-4 text-center">My Orders</h1>

      <!-- Loading Shimmer Effect -->
      <template v-if="isLoading">
        <div class="shimmermain space-y-4">
          <div v-for="n in 3" :key="n" class="flex justify-between">
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

      <!-- Order List -->
      <div v-else>
        <div
          v-for="(order, index) in order_data"
          :key="order.order_id"
          class="border rounded-lg mb-2 shadow-md bg-white"
        >
          <div class="flexdiv flex p-4">
            <div class="flex-shrink-0">
              <img
                :src="order.products[0].images[0].source"
                alt="Product Image"
                class="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold mb-2">Order #{{ order.id }}</h2>
              <p class="text-gray-600 mb-1">Date: {{ order.date }}</p>
              <p class="text-gray-600 mb-1">Total: ₹ {{ order.subtotal }}</p>
              <span
                class="rateText text-blue-800 font-bold capitalize cursor-pointer"
                @click="toggleReviewForm(order.id)"
              >
                {{ activeOrderId === order.id ? "Close Form" : "Rate & Review" }}
              </span>
            </div>
          </div>

          <!-- Review Form -->
          <div
            v-if="activeOrderId === order.id"
            v-for="product in order.products"
            :key="product.product_id"
            class="rate-review px-4 py-3 border-t border-gray-400"
          >
            <div class="starRate">
              <p class="text-black text-xl mb-2">{{ product.name }}</p>
              <div class="starsdiv flex gap-3">
                <span
                  v-for="num in 5"
                  :key="num"
                  class="cursor-pointer"
                  :class="{
                    'text-orange-400': num <= product.rating,
                    'text-gray-500': num > product.rating,
                    'hover:text-yellow-400': num > product.rating,
                  }"
                  @click="setRating(index, product.product_id, num)"
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
                v-model="product.review"
              ></textarea>
            </div>

            <button
              class="commonbtn px-4 block w-fit m-auto mt-2 mr-0"
              @click="submitReview(product)"
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
