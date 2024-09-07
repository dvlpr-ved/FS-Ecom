<script setup>
import { useToast } from "primevue/usetoast";

// const images = [
//   "https://fashtsaly.com/wp-content/uploads/2023/03/44002511001-2-600x901.jpeg",
//   "https://fashtsaly.com/wp-content/uploads/2023/03/1100251105C-3-600x750.jpeg",
//   "https://fashtsaly.com/wp-content/uploads/2023/03/11002511006-1-600x772.jpeg",
//   "https://fashtsaly.com/wp-content/uploads/2023/03/11002511007A-2.jpeg",
// ];

const authStore = useAuthStore();

const itemsToShow = ref(2);
const visible = ref(false);
const socIconsVisible = ref("notActive");
const toast = useToast();

const show = (message) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

const closeModal = () => {
  visible.value = false;
};
const closeSocDiv = () => {
  socIconsVisible.value = "notActive";
};
const toggelShareIcons = () => {
  socIconsVisible.value = socIconsVisible.value ? "active" : "notActive";
};

const addToCart = async () => {};
const updates = ref([]);
const getData = async () => {
  const data = await fetchFromSanctum({
    url: "https://fashtsaly.com/API/public/api/getUpdates",
    method: "GET",
  });
  if (data.success) {
    updates.value = data.data;
  }
};
const addToWishlist = async (product_id) => {
  if (!authStore.isUserLoggedin) {
    visible.value = true;
  }
  const save = wishlistStore.saveWishlistItems(product_id);
};
const removeFromWishList = async (product_id) => {
  show("Item Removed ");
  const remove = wishlistStore.fetchRemoveWishlist(product_id);
};
const wishlistStore = useWishlistStore();
const getWishlistIds = computed(() => wishlistStore.getWishlisterIds);

onMounted(() => {
  getData();
});
</script>
<template>
  <Toast />
  <div class="newProductsWrapper bg-gray-200">
    <!-- we will loop this card -->
    <div
      v-if="updates"
      v-for="update in updates"
      class="newProductsCard w-full m-auto py-2 border-l border-r border-gray-500"
    >
      <div class="carouselNewProduct">
        <carousel :items-to-show="itemsToShow">
          <slide v-for="(img, index) in update.images" :key="index">
            <img
              class="slideImg max-h-[350px] h-full object-cover"
              :src="img.source"
              :alt="img.name"
            />
          </slide>
        </carousel>
      </div>
      <div class="content bg-white">
        <div class="topConten px-[15px] py-1">
          <p class="p_name text-xl mb-1">
            {{ update.name }}
          </p>
          <p class="cardtitle text-gray-700 text-2xl font-bold">
            <span class="line-through text-2xl">₹1000</span> ₹{{ update.mrp }}
          </p>
          <span
            v-if="update.discount"
            class="bgblue80 py-1 px-2 block w-fit capitalize mt-1 text-white"
            >save {{ update.discount }}</span
          >
        </div>
        <div
          class="iconsDiv flex items-center gap-5 border-t border-gray-300 mt-2 py-1 px-3"
        >
          <div class="heartsdiv">
            <i
              v-if="getWishlistIds.indexOf(update.id) == -1"
              class="text-4xl pi pi-heart"
              style="color: rgb(239 68 68)"
              @click="addToWishlist(update.id)"
            ></i>
            <i
              v-else
              @click="removeFromWishList(update.id)"
              class="text-4xl pi pi-heart-fill"
              style="color: rgb(239 68 68)"
            ></i>
          </div>
          <div class="sharedivsoc" @click="toggelShareIcons">
            <i class="pi pi-send text-4xl"></i>
          </div>
          <!-- only for subscriber -->
          <div class="download">
            <i class="pi pi-download text-4xl"></i>
          </div>
        </div>
      </div>
      <div :class="`socIconsForShare transition-all ${socIconsVisible} left-0 right-0 bottom-0 z-20`">
        <div :class="`overlay transition-all ${socIconsVisible}`" @click="closeSocDiv"></div>
        <div
          class="wrapIcons flex justify-center gap-2 bg-white p-4 relative z-10 min-h-[105px]"
        >
          <NuxtLink :to="`/newproducts/${update.name}`" class="hover:text-blue-100">
            <i class="pi primeIcons pi-instagram text-3xl p-2 rounded-full"></i>
          </NuxtLink>
          <NuxtLink :to="`/newproducts/${update.name}`" class="hover:text-blue-100">
            <i class="pi primeIcons pi-facebook text-3xl p-2 rounded-full"></i>
          </NuxtLink>
          <NuxtLink :to="`/newproducts/${update.name}`" class="hover:text-blue-100">
            <i class="pi primeIcons pi-whatsapp text-3xl p-2 rounded-full"></i>
          </NuxtLink>
          <NuxtLink :to="`/newproducts/${update.name}`" class="hover:text-blue-100">
            <i class="pi primeIcons pi-youtube text-3xl p-2 rounded-full"></i>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="min-h-[65vh] flex justify-center items-center">
      <h3 class="text-3xl">No Updates Found</h3>
    </div>
  </div>

  <LoginModal :visible="visible" @closemodal="closeModal" :close="closeModal" />
</template>
<style lang="scss">
.newProductsCard {
  max-width: 576px;
  margin: 0 auto;
  margin-bottom: 15px;

  .slideImg {
  }
  .socIconsForShare {
    display: none;
    visibility: hidden;
  }
  .socIconsForShare.active {
    position: fixed;
    visibility: visible;
    display: block;
  }
  .overlay.active {
    z-index: 1;
    background: rgb(0 0 0 / 8%);
  }
}
</style>
