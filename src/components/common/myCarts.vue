<script setup lang="ts">
import { ref } from "vue";

const GetItemFromCart = useCartStore();
const cards = computed(() => GetItemFromCart.getCart || []);
const total = computed(() => GetItemFromCart.getCartTotal || []);
const loading = ref(false);
const totalComputed = computed(() => {
  return cards.value.reduce((sum, item) => {
    const quantity = quantities.value[item.id] || item.quantity;
    const finalPrice = getPrice(item.price, item.price_subscribed);
    return sum + finalPrice * quantity;
  }, 0);
});

// const apiRemoveItemFromCart = useRemoveItemFromCart();
const RemoveItemFromCart = async (product_id: number) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to remove this item from the cart?"
  );

  if (isConfirmed) {
    const res = await GetItemFromCart.DeleteFromCart({ product_id });
    if (res) {
      console.log("Item removed");
    } else {
      console.error("Error in Removing Item From Cart");
    }
  }
};

const quantities = ref<{ [key: number]: number }>({});

const addMoreProduct = (prod_id: number, quan: number) => {
  if (quantities.value[prod_id]) {
    quantities.value[prod_id] += 1;
  } else {
    quantities.value[prod_id] = quan + 1;
  }
};

const removeMoreProduct = (prod_id: number, quan: number) => {
  if (quan > 1) {
    if (quantities.value[prod_id]) {
      quantities.value[prod_id] -= 1;
    } else {
      quantities.value[prod_id] = quan - 1;
    }
  }
};
const proceedCheckout = async () => {
  let arr = [];
  cards.value.forEach((element) => {
    let elem = element;
    if (Object.keys(quantities.value).length > 0) {
      elem.quantity = quantities.value[element.id]
        ? quantities.value[element.id]
        : element.quantity;
    }
    arr.push(elem);
  });
  const res = await fetchFromSanctum({
    url: "https://fashtsaly.com/API/public/api/proccedCheckout",
    method: "POST",
    body: { items: arr },
  });
  if (res.success) {
    navigateTo("checkout");
  }
};
const proceedCheckoutSingle = async (item) => {
  let arr = [];
  let elem = item;
  if (Object.keys(quantities.value).length > 0) {
    elem.quantity = quantities.value[item.id] ? quantities.value[item.id] : item.quantity;
  }
  arr.push(elem);
  const res = await fetchFromSanctum({
    url: "https://fashtsaly.com/API/public/api/proccedCheckout",
    method: "POST",
    body: { items: arr },
  });
  if (res.success) {
    navigateTo("checkout");
  }
};
</script>

<template>
  <div class="myordersmain bg-gray-200 py-5">
    <div class="myorder_cart container">
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
          <div class="iconimg">
            <i class="pi pi-shopping-cart text-8xl text-gray-500"></i>
          </div>
          <p class="text-2xl border p-2 px-3 w-fit m-auto mb-2">No Item found.</p>
          <NuxtLink to="../" class="text-3xl text-blue-600">Explore Product</NuxtLink>
        </div>
      </template>

      <template v-else>
        <div
          v-if="cards.length"
          class="cardsflex flex flex-wrap justify-between relative"
        >
          <div class="cardsWrapper lg:w-[60%] w-[100%]">
            <div
              v-for="items in cards"
              :key="items.id"
              class="bcards py-2 border-b border-b-300 bg-white lg:p-3 p-2 mb-2 flex items-center justify-between"
            >
              <NuxtLink :to="`searchresult/${items.product_id}`">
                <div class="bcards_inner flex lg:gap-4 gap-3">
                  <div class="flex-shrink-0">
                    <img
                      :src="
                        items.image && items.image.length > 0
                          ? items.image[0].source
                          : 'https://via.placeholder.com/96'
                      "
                      alt="Product Image"
                      class="w-24 h-24 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div class="contentdiv">
                    <div class="topconten">
                      <div class="text-lg font-semibold mb-2">
                        {{ items.product_name }}
                      </div>
                      <p class="text-gray-600 mb-1">{{ items.created_at }}</p>
                      <p class="text-gray-600 mb-1">
                        Price: ₹{{ getPrice(items.price, items.price_subscribed) }}/PCS
                      </p>
                    </div>
                    <div
                      class="productCounter mb-3 flex gap-4 border border-gray-400 p-2 px-3 w-[fit-content]"
                    >
                      <button
                        @click="
                          removeMoreProduct(
                            items.id,
                            quantities[items.id] ? quantities[items.id] : items.quantity
                          )
                        "
                      >
                        <i class="pi pi-minus"></i>
                      </button>
                      <span>{{
                        quantities[items.id] ? quantities[items.id] : items.quantity
                      }}</span>
                      <button
                        @click="
                          addMoreProduct(
                            items.id,
                            quantities[items.id] ? quantities[items.id] : items.quantity
                          )
                        "
                      >
                        <i class="pi pi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </NuxtLink>
              <div class="flexbtn flex flex-col gap-5 lg:mt-3 mt-2">
                <button
                  class="bg-[#e53535] text-white py-1 px-3 rounded"
                  @click="RemoveItemFromCart(items.id)"
                >
                  Remove
                </button>
                <button
                  @click="proceedCheckoutSingle(items)"
                  class="bgorange text-white py-1 px-3 rounded"
                >
                  Buy This
                </button>
              </div>
            </div>
          </div>

          <div
            class="priceTable bg-white lg:w-[35%] w-[100%] lg:mt-0 mt-3 h-fit sticky top-5"
          >
            <div class="text-3xl text-gray-700 border-b border-b-gray-300 p-3">
              Price details
            </div>
            <div class="flexPrice flex justify-between p-3">
              <span class="text-xl">Price </span>
              <span class="text-xl text-gray-800">₹ {{ totalComputed }}</span>
            </div>
            <div class="flexPrice flex justify-between p-3">
              <span class="text-xl">Discount</span>
              <span class="text-xl text-green-600">- ₹ 0</span>
            </div>
            <div class="flexPrice flex justify-between border-b border-b-gray-300 p-3">
              <span class="text-xl">Delivery Charges</span>
              <span class="text-xl text-gray-800"> ₹ 0 </span>
            </div>
            <div class="flexPrice flex justify-between border-b border-b-gray-300 p-3">
              <span class="text-xl font-bold">Total Amount</span>
              <span class="text-xl text-gray-800 font-bold"> ₹ {{ totalComputed }} </span>
            </div>
            <p class="text-xl p-3">
              Your Saving <span class="text-xl text-green-600">₹0</span> on this order
            </p>
            <button
              @click="proceedCheckout"
              class="px-4 py-2 text-2xl bgorange text-white w-full"
            >
              Place Order
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.myorder_cart {
  max-width: 1024px;
  /* .bcards {
    border-bottom-width: 8px;
  }*/
}
</style>
