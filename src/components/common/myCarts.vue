<script setup lang="ts">
import { ref } from "vue";

const GetItemFromCart = useCartStore();
const cards = computed(() => GetItemFromCart.getCart || []);
const total = computed(() => GetItemFromCart.getCartTotal || []);
const loading = ref(false);
const apiRemoveItemFromCart = useRemoveItemFromCart();
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
</script>

<template>
  <div class="myordersmain bg-gray-200 py-5">
    <div class="myorder_inner container">
      <h1 class="text-3xl font-semibold mb-4 text-center">My Cart</h1>

      <template v-if="isLoading">
        <!-- Loading Shimmer -->
      </template>

      <template v-else-if="cards.getCartLength === 0">
        <!-- Empty Cart Message -->
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
                    <h2 class="text-lg font-semibold mb-2">{{ items.product_name }}</h2>
                    <p class="text-gray-600 mb-1">{{ items.created_at }}</p>
                    <p class="text-gray-600 mb-1">Price: ₹{{ items.price }}</p>
                  </div>
                  {{ quantities }}
                  <div class="productCounter mb-3 flex gap-4 border border-gray-400 p-2 px-3 w-[fit-content]">
                    <button @click="removeMoreProduct(items.id, quantities[items.id] ? quantities[items.id] : items.quantity)">
                      <i class="pi pi-minus"></i>
                    </button>
                    <span>{{ quantities[items.id] ? quantities[items.id] : items.quantity }}</span>
                    <button @click="addMoreProduct(items.id, quantities[items.id] ? quantities[items.id] : items.quantity)"><i class="pi pi-plus"></i></button>
                  </div>                  
                  <div class="flexbtn flex gap-5 lg:mt-3 mt-2">
                    <button
                      class="bg-[#e53535] text-white py-1 px-3 rounded"
                      @click="RemoveItemFromCart(items.id)"
                    >
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

          <div
            class="priceTable bg-white lg:w-[35%] w-[100%] lg:mt-0 mt-3 h-fit sticky top-5"
          >
            <!-- Price details -->
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
