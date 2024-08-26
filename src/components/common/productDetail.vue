<script setup lang="ts">
import { publicApi } from "/utils/publicApi.js";
const Checkvisible = ref("");
const productCount = ref(1);
const route = useRoute();

const cart = useCartStore();
const addMoreProduct = () => {
  if (sku.value.stock > productCount.value) {
    productCount.value++;
  }
};
const removeMoreProduct = () => {
  if (productCount.value > 1) productCount.value--;
};

const handleAddToCart = async () => {
  const addToCart = await cart.saveCartItem({
    product_id: sku.value.id,
    is_wishlist: 0,
    quantity: productCount.value,
  });
  if (addToCart.success) {
    navigateTo("/mycart");
    // Checkvisible.value = "active";
  } else {
    if (addToCart.msg) {
      // alert(addToCart.msg);
      navigateTo("/mycart");
    }
  }
};
const handleAdCartClose = () => {
  Checkvisible.value = "";
};
const vendor = ref(null);
const product = ref(null);
const suggestions = ref(null);
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
    product.value = data.product;
    suggestions.value = data.suggestions;
    color.value = data.colors;
    size.value = data.sizes;
    sku.value = data.sku;
    colorSelected.value = sku.value.color ? sku.value.color : "";
    sizeSelected.value = sku.value.size ? sku.value.size : "";
    imageShown.value = sku.value.image[0] ? sku.value.image[0].source : "";
  }
};
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
</script>
<template>
  <div class="productdetail_man_div py-5">
    <div v-if="product" class="container">
      <div class="flexdiv flex flex-wrap justify-between">
        <div class="detailGallery lg:w-[42%] w-[100%]">
          <ProductZoomImages :data="imageShown ? imageShown : ''" />
          <div class="flex overflow-x-auto lg:w-[42%] w-[100%]">
            <div v-for="image in sku.image">
              <img
                @click="imageShown = image.source"
                :src="image.source"
                class="w-[80px] h-[80px] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div class="productcontent lg:w-[58%] w-[100%]">
          <h6 class="pro-title lg:text-2xl text-4xl mb-3">
            {{ product.name ? product.name : "" }}
          </h6>
          <div class="price">
            <p v-if="!skuIsLoading" class="cardtitle text-3xl font-[500] text-black mb-3">
              <!-- <span class="line-through text-2xl text-gray-700">₹800</span> -->
              ₹{{ sku.price ? sku.price : "" }}
            </p>

            <span v-else-if="skuIsLoading || isOutOfStock" class="text-3xl block mb-3"
              >Contact Seller</span
            >
            <span
              v-else
              class="block shimmer py-4 mb-1 w-[25%] rounded-sm bg-gray-50"
            ></span>
          </div>
          <div class="sizesBox flex items-center mb-3">
            <span class="text-2xl">Sizes :</span>
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
            <span class="text-2xl inline-block lg:w-auto w-full">Colors :</span>
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

          <article class="productdesc mb-3">
            {{ product.description ? product.description : "" }}
          </article>
          <div
            class="productCounter mb-3 flex gap-4 border border-gray-400 p-2 px-3 w-[fit-content]"
          >
            <button @click="removeMoreProduct">
              <i class="pi pi-minus"></i>
            </button>
            <span>{{ productCount }}</span>
            <button @click="addMoreProduct"><i class="pi pi-plus"></i></button>
          </div>
          <div class="btnsdiv flex justify-between">
            <button
              @click="handleAddToCart"
              :danger="true"
              :disabled="skuIsLoading || isOutOfStock ? true : false"
              class="py-3 w-[48%] bg-black transition text-white capitalize rounded flex items-center gap-2 justify-center hover:bg-[white] hover:border hover:border-black hover:text-gray-900"
            >
              <i class="pi pi-cart-plus lg:text-3xl text-2xl"></i>
              {{ isOutOfStock ? "Out of stock" : "Add to cart / Buy Now" }}
            </button>
            <button class="w-[48%]">
              <NuxtLink
                :to="`https://api.whatsapp.com/send?phone=+910123456789&text=Hello, Looking i want to buy ${product.name}. Get in touch with me my name is`"
                class="Booknowbtn animate-bounce py-3 bg-green-400 text-white capitalize rounded text-2xl text-center flex items-center gap-2 justify-center"
                target="_blank"
                ><i class="pi pi-whatsapp lg:text-3xl text-2xl"></i
                >{{ skuIsLoading || isOutOfStock ? "Inquire Now" : "Book Now" }}</NuxtLink
              >
            </button>
          </div>
          <div class="sharediv py-5 flex flex-wrap gap-2 items-end">
            <span class="lg:text-2xl mb-1 w-full">Share Now : </span>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-instagram text-2xl transition"></i>
            </NuxtLink>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-whatsapp text-2xl transition"></i>
            </NuxtLink>
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-facebook text-2xl transition"></i>
            </NuxtLink>
            <!-- <NuxtLink to="JavaScript:void(0)"> <i class="pi pi-pinterest text-2xl transition"></i> </NuxtLink> -->
            <NuxtLink to="JavaScript:void(0)">
              <i class="pi pi-twitter text-2xl transition"></i>
            </NuxtLink>
          </div>

          <div class="vendrsDetail" v-if="vendor">
            <div class="flex flex-wrap pb-2 gap-2 items-center lg:text-[18px] text-1xl">
              <p class="w-full text-3xl">Seller Details</p>
              <span class="text-gray-600" style="font-size: 16px"
                >{{ vendor.name ? vendor.name : "" }},
                {{ vendor.email ? vendor.email : "" }}</span
              >
            </div>
            <!-- <div class="flex pb-2 gap-2 items-center lg:text-[18px] text-1xl">
              Seller Address :
              <span class="text-gray-600" style="font-size: 16px">{{
                vendor.email ? vendor.email : ""
              }}</span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- Releted Products -->
      <SimilarProducts :suggestions="suggestions" />
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

  <AddtoCartModal :Checkvisible="Checkvisible" :handleAdCartClose="handleAdCartClose" />
</template>

<style lang="scss">
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
