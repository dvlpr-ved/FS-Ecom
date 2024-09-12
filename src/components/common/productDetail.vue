<script setup lang="ts">
import { publicApi } from "/utils/publicApi.js";
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();

const toast = useToast();
const show = (message, DieLife = 4000) => {
  toast.add({ severity: "success", detail: message, life: DieLife });
};
const visible = ref(false);
const closeModal = () => {
  visible.value = false;
};

const Checkvisible = ref("");
const productCount = ref(1);
const route = useRoute();

const cart = useCartStore();
const addMoreProduct = () => {
  if (sku.value.stock > productCount.value) {
    productCount.value++;
    // show('product increased by one')
  }
};
const removeMoreProduct = () => {
  if (productCount.value > 1) productCount.value--;
};

const handleAddToCart = async (action) => {
  if (!authStore.isUserLoggedin) {
    visible.value = true;
  }
  if (isOutOfStock.value) {
    navigateTo(
      `https://api.whatsapp.com/send?phone=+910123456789&text=Hello, I want to buy ${product.value.name}.  My name is`
    );
    return;
  }
  const addToCart = await cart.saveCartItem({
    product_id: sku.value.id,
    is_wishlist: 0,
    quantity: productCount.value,
  });
  if (addToCart.success) {
    if (action == "buy") {
      navigateTo("/mycart");
    } else {
      // show("Item added to cart");
      // alert("Item added to cart");
    }
  } else {
    if (addToCart.msg) {
      navigateTo("/myCart");
    }
  }
};
const handleAdCartClose = () => {
  Checkvisible.value = "";
};
const vendor = ref(null);
const product = ref(null);
const suggestions = ref(null);
const vendorsProducts = ref(null);
const color = ref(null);
const size = ref(null);
const colorSelected = ref(null);
const sizeSelected = ref(null);
const sku = ref(null);
const imageShown = ref(null);
const getProduct = async () => {
  const { data, success } = await publicApi({
    url: `api/getProductDetails`,
    method: "POST",
    body: { product_id: route.params.id },
  });
  if (success) {
    vendor.value = data.vendor;
    vendorsProducts.value = data.same_vendor;
    product.value = data.product;
    suggestions.value = data.suggestions;
    color.value = data.colors;
    size.value = data.sizes;
    sku.value = data.sku;
    colorSelected.value = sku.value.color ? sku.value.color : "";
    sizeSelected.value = sku.value.size ? sku.value.size : "";
    imageShown.value = sku.value.image[0] ? sku.value.image[0].source : "";
    saveProductToVisited(data.product);
  }
};
function saveProductToVisited(product) {
  const visitedProducts = JSON.parse(localStorage.getItem("visitedProducts")) || [];
  const updatedProducts = visitedProducts.filter((p) => p.id !== product.id);

  updatedProducts.unshift(product);
  if (updatedProducts.length > 6) {
    updatedProducts.pop(); // Remove the oldest product (last in the array)
  }

  localStorage.setItem("visitedProducts", JSON.stringify(updatedProducts));
}
onMounted(() => {
  getProduct();
});
const handleSizeChange = (val) => {
  sizeSelected.value = val;
};
const handleColorChange = (val) => {
  colorSelected.value = val;
};
const skuIsLoading = ref(false);
const isOutOfStock = ref(false);
watch([colorSelected, sizeSelected], async () => {
  skuIsLoading.value = true;
  const res = await fetchFromSanctum({
    url: `https://fashtsaly.com/API/public/api/fetchSingleSku`,
    method: "POST",
    body: {
      product_id: product.value.id,
      color: colorSelected.value,
      size: sizeSelected.value,
    },
  });
  if (res.success) {
    skuIsLoading.value = false;
    sku.value = res.sku;
    imageShown.value = sku.value.image[0] ? sku.value.image[0].source : "";
    if (sku.stock < 1) {
      isOutOfStock.value = true;
    } else {
      if (productCount.value > sku.stock) {
        productCount.value = sku.stock;
      }
      isOutOfStock.value = false;
    }
  } else {
    isOutOfStock.value = true;
  }
});

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
const isDownloadingImage = ref(false);

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
    copyToClipboard();
    isDownloadingImage.value = false;
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    alert("Please refresh and try again");
  }
}

function copyToClipboard() {
  const productDescElement = document.getElementById("productDesc");
  const text = productDescElement ? productDescElement.innerText : "";
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        show("product Detail copied to your clipboard", 15000);
      })
      .catch((err) => {
        alert("Failed to copy text. Please try again.");
        console.error(err);
      });
  } else {
    alert("Copied to clipboard!");
  }
}
</script>
<template>
  <div class="productdetail_man_div bg-gray-200">
    <Toast />
    <div v-if="product" class="container bg-gray-100">
      <div
        class="flexdiv flex flex-wrap lg:justify-between justify-center border-b border-gray-300 pb-5"
      >
        <div
          class="detailGallery lg:w-[48%] w-[100%] relative lg:pt-5 pt-2 lg:pr-4 lg:sticky h-fit top-0"
        >
          <ProductZoomImages :data="imageShown ? imageShown : ''" />
          <div class="flex overflow-x-auto lg:w-[42%] w-[100%]">
            <div v-for="(image, index) in sku.image" :key="index">
              <img
                @click="imageShown = image.source"
                :src="image.source"
                class="lg:h-[90px] h-[70px] cursor-pointer"
              />
              <button
                :disabled="isDownloadingImage"
                @click="downloadImage(image.source, product.description)"
                class="absolute lg:bottom-[120px] bottom-[80px] left-0 py-[5px] px-3 text-white border border-gray-600 bgblue80 rounded cursor-pointer"
              >
                <i v-if="!isDownloadingImage" class="pi pi-arrow-down"></i>
                <i v-else class="pi pi-spinner"></i>
                <!-- Get <br/> Updates -->
              </button>
            </div>
          </div>
          <div class="heartsdiv absolute top-[25px] right-[25px]">
            <i
              v-if="getWishlistIds.indexOf(product.id) == -1"
              class="lg:text-5xl text-3xl cursor-pointer pi pi-heart"
              style="color: rgb(239 68 68)"
              @click="addToWishlist(product.id)"
            ></i>
            <i
              v-else
              @click="removeFromWishList(product.id)"
              class="lg:text-5xl text-3xl cursor-pointer pi pi-heart-fill"
              style="color: rgb(239 68 68)"
            ></i>
          </div>
        </div>
        <div class="productcontent lg:w-[50%] w-[100%] pt-4">
          <div class="pro-title lg:text-3xl text-2xl mb-3 capitalize">
            {{ product.name ? product.name : "" }}
          </div>
          <div class="price">
            <p v-if="!skuIsLoading" class="cardtitle text-3xl font-[500] text-black mb-3">
              <!-- <span class="line-through text-2xl text-gray-700">₹800</span> -->
              ₹{{ getPrice(sku.price , sku.price_subscribed)  }}
            </p>
            <span
              v-else-if="skuIsLoading || isOutOfStock"
              class="block text-2xl shimmer pl-5 w-[25%] text-gray-300 bg-gray-50 mb-3"
              >₹</span
            >
          </div>
          <span class="bgblue80 py-1 px-2 block w-fit capitalize mb-3 text-white"
            >save 20%</span
          >
          <div class="sizesBox flex items-center mb-3">
            <span class="text-gray-700">Sizes :</span>
            <div
              v-for="s in size"
              @click="handleSizeChange(s)"
              class="checkbox px-2 py-1 border-gray-500"
            >
              <input
                class="sizeBoxInput"
                type="radio"
                :checked="sizeSelected == s ? true : false"
                name="sizeselected"
                v-model="sizeSelected"
              />
              <label for="msize" class="title">{{ s }}</label>
            </div>
          </div>
          <div class="sizesBox flex items-center flex-wrap mb-3">
            <span class="text-gray-700 inline-block lg:w-auto w-full">Colors :</span>
            <div
              v-for="c in color"
              @click="handleColorChange(c)"
              class="checkbox px-2 py-1 border-gray-500"
            >
              <input
                class="sizeBoxInput"
                type="radio"
                name="colorsekected"
                :checked="colorSelected == c ? true : false"
                v-model="colorSelected"
              />
              <label for="msize" class="title">{{ c }}</label>
            </div>
          </div>
          <div class="msgBox">
            <!-- for normal user -->
            <p
              class="capitalize flex items-center gap-2"
              v-if="!authStore.userData.is_paid_subscription"
            >
              <i class="pi pi-tag text-xl text-orange-500"></i> Additional 10% off on all
              prepaid orders
            </p>
            <!-- for subscribers -->
            <p class="capitalize hidden" v-else>
              <i class="pi pi-tag text-xl text-orange-500"></i> Additional 50/- rs off on
              all prepaid orders
            </p>
          </div>
          <div class="flexTextBoxes flex flex-wrap justify-between my-3 lg:max-w-[55%]">
            <div class="text-center">
              <span
                class="bg-gray-200 rounded-full h-[50px] w-[50px] m-auto flex items-center justify-center"
                ><i class="text-3xl pi pi-shopping-cart"></i>
              </span>
              <span class="block">
                Free <br />
                Shipping
              </span>
            </div>
            <div class="text-center">
              <span
                class="bg-gray-200 rounded-full h-[50px] w-[50px] m-auto flex items-center justify-center"
                ><i class="text-3xl pi pi-shield"></i>
              </span>
              <span class="block">
                Secure <br />
                Transaction
              </span>
            </div>
            <div class="text-center">
              <span
                class="bg-gray-200 rounded-full h-[50px] w-[50px] m-auto flex items-center justify-center"
                ><i class="text-3xl pi pi-map-marker"></i>
              </span>
              <span class="block">
                Easy order <br />
                Tracking
              </span>
            </div>
          </div>
          <div class="text-2xl py-2">Description :</div>
          <article class="productdesc mb-3" id="productDesc">
            {{ product.description ? product.description : "" }}
          </article>
          <div
            class="productCounter mb-3 flex gap-4 border border-gray-400 p-2 px-3 w-[fit-content]"
          >
            <button
              @click="removeMoreProduct"
              :disabled="skuIsLoading || isOutOfStock ? true : false"
            >
              <i class="pi pi-minus"></i>
            </button>
            <span>{{ productCount }}</span>
            <button
              @click="addMoreProduct"
              :disabled="skuIsLoading || isOutOfStock ? true : false"
            >
              <i class="pi pi-plus"></i>
            </button>
          </div>
          <div class="btnsdiv flex flex-wrap lg:gap-5 gap-1 mb-5">
            <button
              @click="handleAddToCart('cart')"
              :danger="true"
              :disabled="skuIsLoading || isOutOfStock ? true : false"
              class="lg:py-3 py-[10px] lg:w-[38%] w-[48%] lg:text-xl bg-black transition text-white capitalize rounded flex items-center gap-2 justify-center hover:bg-[white] hover:border hover:border-black hover:text-gray-900"
            >
              <i class="pi pi-cart-plus lg:text-3xl text-2xl"></i>
              {{ isOutOfStock ? "Out of stock" : "Add to cart" }}
            </button>
            <button
              @click="handleAddToCart('buy')"
              :danger="true"
              :disabled="skuIsLoading || isOutOfStock ? true : false"
              v-if="!isOutOfStock"
              class="lg:py-3 py-[10px] lg:w-[38%] w-[48%] lg:text-xl bgorange transition text-white capitalize rounded flex items-center gap-2 justify-center hover:bg-[white] hover:border hover:border-black hover:text-gray-900"
            >
              <i class="pi pi-tag lg:text-3xl text-2xl"></i>
              Buy Now
            </button>
            <button v-else class="lg:w-[38%] w-[100%]">
              <NuxtLink
                :to="`https://api.whatsapp.com/send?phone=+910123456789&text=Hello, I want to buy ${product.name}. My name is`"
                class="Booknowbtn lg:py-3 py-[10px] bg-green-600 text-white capitalize rounded text-2xl text-center flex items-center gap-2 justify-center"
                target="_blank"
                ><i class="pi pi-whatsapp lg:text-3xl text-2xl"></i>Inquire Now</NuxtLink
              >
            </button>
          </div>

          <!-- <div class="sharediv py-5 flex flex-wrap lg:gap-x-5 items-end">
            <span class="lg:text-xl mb-1 w-full capitalize">Share on social media: </span>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-instagram text-2xl transition"></i>
            </NuxtLink>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-whatsapp text-2xl transition"></i>
            </NuxtLink>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-facebook text-2xl transition"></i>
            </NuxtLink>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-twitter text-2xl transition"></i>
            </NuxtLink>
          </div> -->

          <div
            class="vendrsDetail"
            v-if="vendor && authStore.userData.is_paid_subscription"
          >
            <div class="flex flex-wrap pb-2 gap-2 items-center lg:text-[18px] text-1xl">
              <p class="w-full text-xl capitalize">Manufacturer details:</p>
              <span class="text-gray-600" style="font-size: 16px"
                >{{ vendor.name ? vendor.name : "" }},
                {{ vendor.email ? vendor.email : "" }}</span
              >
            </div>
          </div>
          <div class="que-and-review border bg-gray-100 p-3 pr-5 lg:w-[97%]">
            <askQuetion :product_id="product.id" />
            <div class="border mt-2 bg-gray-200 p-2 rounded">
              <div class="text-2xl mb-2 headingsFontt">Ratings & Reviews</div>
              <reviewRating />
            </div>
          </div>
        </div>
      </div>
      <!-- Releted Products -->
      <SimilarProducts :vendorsProducts="vendorsProducts" :suggestions="suggestions" />
    </div>
    <div v-else>
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          <div class="shimmer w-full lg:w-5/12 h-96 rounded-lg"></div>
          <div class="shimmer lg:w-7/12 h-24 mt-4 lg:mt-0 rounded-lg"></div>
        </div>

        <!-- Product Details Section -->
        <div class="space-y-4">
          <div class="shimmer h-10 w-3/4 rounded"></div>
          <div class="shimmer h-8 w-1/2 rounded"></div>
          <div class="shimmer flex items-center gap-2 h-10 rounded"></div>
          <div class="shimmer flex items-center gap-2 h-10 rounded"></div>
          <div class="shimmer h-24 w-full rounded"></div>
          <div
            class="shimmer flex items-center gap-4 border border-gray-400 p-2 px-3 w-fit h-12 rounded"
          ></div>
          <div class="shimmer flex gap-4 h-12 rounded"></div>
          <div class="shimmer flex gap-2 items-end h-12 rounded"></div>
          <div class="shimmer flex flex-col gap-2">
            <div class="h-10 rounded"></div>
            <div class="h-10 rounded"></div>
          </div>
        </div>
        <div class="shimmer w-full h-64 mt-8 rounded-lg"></div>
      </div>
    </div>
  </div>
  <!-- <AddtoCartModal :Checkvisible="Checkvisible" :handleAdCartClose="handleAdCartClose" /> -->
  <LoginModal :visible="visible" @closemodal="closeModal" :close="closeModal" />
</template>

<style lang="scss">
.productdetail_man_div .container {
  max-width: 1400px;
}
.p-toast-message-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-transform: capitalize;
}
.sharediv {
  i {
    border: 1px solid var(--primary);
    padding: 8px;
    background-color: var(--primary);
    color: var(--white);
    border-radius: 50px;
    &:hover {
      color: var(--primary);
      background: transparent;
    }
  }
}
</style>
