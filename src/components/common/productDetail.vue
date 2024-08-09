<script setup lang="ts">
import {publicApi} from '/utils/publicApi.js'
const Checkvisible = ref("");
const productCount = ref(1);
const route = useRoute();

const cart = useCartStore();
const addMoreProduct = () => {
  if(sku.value.stock > productCount.value){
    productCount.value++;
  }
};
const removeMoreProduct = () => {
  if (productCount.value > 1) productCount.value--;
};

const handleAddToCart =async () => {
  const addToCart = await cart.saveCartItem({product_id : sku.value.id , is_wishlist : 0 , quantity : productCount.value});
  if(addToCart.success){
    Checkvisible.value = "active";
  }
  else{
    if(addToCart.msg){
      alert(addToCart.msg);
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
const getProduct =async () => {
  const {data ,  success} = await publicApi({'url' : `api/getProductDetails` , 'method' : 'POST' , 'body' : {product_id : route.params.id}});
  if(success){
    vendor.value = data.vendor;
    product.value = data.product;
    suggestions.value = data.suggestions;
    color.value = data.colors;
    size.value = data.sizes;
    sku.value = data.sku;
    colorSelected.value = sku.value.color ? sku.value.color : '';
    sizeSelected.value = sku.value.size ? sku.value.size : '';
  }
}
onMounted(() => {
  getProduct();
})
const handleSizeChange= (val) => {
  sizeSelected.value = val;
}
const handleColorChange = (val) => {
  colorSelected.value =val;
}
const skuIsLoading =ref(false);
const isOutOfStock = ref(false);
watch([colorSelected, sizeSelected],async () => {
  skuIsLoading.value = true;
  const res = await fetchFromSanctum({
    url : `https://fashtsaly.com/API/public/api/fetchSingleSku` ,
    method : 'POST',
    body:{
      product_id : product.value.id,
      color : colorSelected.value,
      size : sizeSelected.value,
    } 
  });
  if(res.success){
    skuIsLoading.value = false;
    sku.value = res.sku;
    if(sku.stock < 1){
      isOutOfStock.value = true;
    }
    else{
      if(productCount.value > sku.stock){
        productCount.value = sku.stock;
      }
      isOutOfStock.value = false;
    }
  }
  else{
    isOutOfStock.value = true
  }
});
</script>
<template>
  <div class="productdetail_man_div py-5">
    <div v-if="product" class="container">
      <div class="flexdiv flex flex-wrap justify-between">
        <div class="detailGallery lg:w-[48%] w-[100%] bg-gray-200 p-2">
          <ProductZoomImages :data="sku.image"/>
        </div>
        <div class="productcontent lg:w-[50%] w-[100%]">
          <h6 class="pro-title lg:text-6xl text-4xl mb-3">{{ product.name ? product.name : '' }}</h6>
          <div class="price">
            <p v-if="!skuIsLoading" class="cardtitle text-3xl font-[500] text-black mb-3">
              <!-- <span class="line-through text-2xl text-gray-700">₹800</span> -->
               ₹{{ sku.price ? sku.price : '' }}
            </p>
          </div>
          <div class="sizesBox flex items-center gap-x-2 mb-3">
            <span class="text-2xl">Sizes :</span>
            <div v-for="s in size" @click="handleSizeChange(s)" class="checkbox border-r px-2 py-1 border-gray-500">
              <input
                class="styled-checkbox"
                type="radio"
                :checked="sizeSelected==s ? true : false"
                name="sizeselected"
                v-model="sizeSelected"
              />
              <label for="msize" class="text-xl title">{{ s }}</label>
            </div>
          </div>
          <div class="sizesBox flex items-center gap-x-2 mb-3">
            <span class="text-2xl">Colors :</span>
            <div v-for="c in color" @click="handleColorChange(c)" class="checkbox border-r px-2 py-1 border-gray-500">
              <input
                class="styled-checkbox"
                type="radio"  
                name="colorsekected"
                :checked="colorSelected==c ? true : false"
                v-model="colorSelected"
              />
              <label for="msize" class="text-xl title">{{ c }}</label>
            </div>
          </div>

          <article class="productdesc mb-3">
              {{ product.description ?  product.description : ''}}
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
              <i class="pi pi-cart-plus lg:text-3xl text-2xl"></i> {{ isOutOfStock ? 'Out of stock' : 'Add to cart' }}
            </button>
            <button class="w-[48%]">
              <BookNow
                :bounceAni="'animate-bounce'"
                bookingLink="https://api.whatsapp.com/send?phone=+910123456789&text=Hello, Looking for banarasee saree. Get in touch with me my name is"
              />
            </button>
          </div>
          <div class="sharediv py-5 flex gap-2 items-end">
            <span class="lg:text-2xl mb-1">Share Now : </span>
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
            <div class="flex pb-2 gap-2 items-center lg:text-[18px] text-1xl">
              Seller Name :
              <span class="text-gray-600" style="font-size: 16px">{{ vendor.name ? vendor.name : ''}}</span>
            </div>
            <div class="flex pb-2 gap-2 items-center lg:text-[18px] text-1xl">
              Seller Address :
              <span class="text-gray-600" style="font-size: 16px">{{ vendor.email ? vendor.email : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Releted Products -->
      <SimilarProducts  :suggestions="suggestions"/>
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
