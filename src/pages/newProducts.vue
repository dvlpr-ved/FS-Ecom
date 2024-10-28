<script setup>
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();
const pageurl = ref("");

const itemsToShow = ref(2);
const visible = ref(false);
const socIconsVisible = ref("notActive");
const isDownloadingImage = ref(false);

const toast = useToast();

const show = (message, DieLife = 4000) => {
  toast.add({ severity: "info", detail: message, life: DieLife });
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
  const remove = wishlistStore.fetchRemoveWishlist(product_id);
  // show("Item Removed ");
};
const wishlistStore = useWishlistStore();
const getWishlistIds = computed(() => wishlistStore.getWishlisterIds);

async function downloadImage(url, Product_desc) {
  // Product_desc

  isDownloadingImage.value = true;
  try {
    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      alert("Please refresh and try again");
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // copy pro desc
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(Product_desc)
        .then(() => {
          show("product Detail copied to your clipboard", 15000);
        })
        .catch((err) => {
          show("Failed to copy text. Please try again", 15000);
          console.error(err);
        });
    } else {
      alert("Copied to clipboard!");
    }
    isDownloadingImage.value = false;
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    alert("Please refresh and try again");
  }
}

onMounted(() => {
  getData();
  if (process.client) {
    pageurl.value = window.location.href;
  }
});
</script>
<template>
  <Toast />
  <div class="newProductsWrapper bg-gray-300">
    <!-- we will loop this card -->
    <div
      v-if="updates"
      v-for="update in updates"
      class="newProductsCard w-full m-auto border-l border-r bg-white pt-2 mb-2"
    >
  
      <NuxtLink :to="`../searchresult/${update.id}`">
        <div class="carouselNewProduct">
          <carousel :items-to-show="itemsToShow">
            <slide v-for="(img, index) in update.images" :key="index" class="mx-1">
              <div class="imgdiv relative">
                <img
                  class="slideImg h-[255px] w-full object-cover"
                  :src="img.source"
                  :alt="img.name"
                />
                <div
                  v-if="authStore.userData.is_paid_subscription"
                  class="downloadBtn bg-white p-[10px] absolute z-10 bottom-0 right-[-1px]"
                  @click="downloadImage(img.source, update.description)"
                >
                  <i class="pi pi-download text-2xl"></i>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
        <div class="content bg-gray-100">
          <div class="topConten px-[15px] py-1">
            <p class="p_name text-xl mb-1">
              {{ update.name }}
            </p>
            <p class="cardtitle text-gray-700 text-2xl font-bold">
              <span class="line-through text-2xl">₹1000</span> ₹ {{ update.mrp }}
            </p>
            <span
              v-if="update.discount"
              class="bgblue80 py-1 px-2 block w-fit capitalize mt-1 text-white"
              >save {{ update.discount }}</span
            >
          </div>
          <div
            class="iconsDiv flex items-center gap-5 justify-between border-t border-gray-300 mt-2 py-2 px-3"
          >
            <div class="lefticons flex items-center gap-5">
              <div class="heartsdiv">
                <i
                  v-if="getWishlistIds.indexOf(update.id) == -1"
                  class="text-2xl pi pi-heart"
                  style="color: rgb(239 68 68)"
                  @click="addToWishlist(update.id)"
                ></i>
                <i
                  v-else
                  @click="removeFromWishList(update.id)"
                  class="text-2xl pi pi-heart-fill"
                  style="color: rgb(239 68 68)"
                ></i>
              </div>
              <div class="sharedivsoc" @click="toggelShareIcons">
                <i class="pi pi-send text-2xl"></i>
              </div>
            </div>

            <div class="sharedivsoc text-xl flex items-center gap-2">
              <i class="pi pi-eye text-2xl"></i>
              {{ update.visited }}
            </div>
          </div>
        </div>
        <div
          :class="`socIconsForShare transition-all ${socIconsVisible} left-0 right-0 bottom-0 z-20`"
        >
          <div
            :class="`overlay transition-all ${socIconsVisible}`"
            @click="closeSocDiv"
          ></div>

          <ClientOnly>
            <div
              class="wrapIcons flex justify-center gap-2 bg-white p-4 relative z-10 min-h-[105px]"
            >
              <SocialShare
                v-for="network in ['facebook', 'twitter', 'whatsapp']"
                :key="network"
                :url="'https://shop.fashtsaly.com/searchresult/' + update.id"
                :network="network"
              >
                <template #label>{{ network }}</template>
              </SocialShare>
            </div>
          </ClientOnly>
        </div>
      </NuxtLink>
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

  .social-share-button__label {
    display: none;
  }

  .downloadBtn {
    border-radius: 23px 0 0 0;
  }

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
