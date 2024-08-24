<script setup lang="ts">
const props = defineProps<{
  images?: string;
  title?: string;
  id?: number;
  price?: number;
  description?: string;
}>();

const wishlistStore = useWishlistStore();
const fetchWishlistData = async () => {
  await wishlistStore.fetchWishlistItems();
};

const getWishlist = computed(() => wishlistStore.getWishlist);
const getWishlistIds = computed(() => wishlistStore.getWishlisterIds);

const isItemInWishlist = computed(() =>
  getWishlist.value.some((item) => item.product_id === props.id)
);

const message = ref<string | null>(null);

const addToCart = async (product_id: number) => {
  if (props.id === undefined) {
    message.value = "Product ID is undefined";
    alert(message.value);
    return;
  }

  try {
    const isInWishlist = isItemInWishlist.value;
    let result;
    if (isInWishlist) {
      const removed = await wishlistStore.fetchRemoveWishlist(product_id);
      if (removed) {
        message.value = "Item removed from wishlist";
      } else {
        message.value = "Failed to remove item from wishlist";
      }
    } else {
      result = await wishlistStore.saveWishlistItems(product_id);
      if (result.success) {
        message.value = "Item added to wishlist";
      } else {
        message.value = result.msg;
      }
    }
    if (message.value) {
      // alert(message.value);
      navigateTo("/wishlist");
    }
  } catch (error) {
    console.error("Error adding/removing product from wishlist:", error);
    message.value = "Error adding/removing product from wishlist";
    alert(message.value);
  }
};
onMounted(async () => {
  await fetchWishlistData();
});
</script>

<template>
  <div class="commonCard shadow transition border tooltipGroup relative">
    <div class="watchListIcons absolute top-[15px] z-10 right-[15px] cursor-pointer">
      <p class="relative">
        <i
          class="text-4xl pi pi-heart"
          style="color: rgb(239 68 68)"
          @click="addToCart(props.id)"
        ></i>
        <i
          @click="addToCart(props.id)"
          class="text-4xl pi pi-heart-fill"
          style="color: rgb(239 68 68)"
          v-if="getWishlistIds.indexOf(props.id) > -1"
        ></i>
      </p>
    </div>
    <NuxtLink :to="`../searchresult/${props.id}`">
      <figure class="relative">
        <img
          class="w-full cardimg lg:h-[335px] lg:w-[265px]"
          :src="props.images || '~assets/images/common/noImage.jpg'"
          :alt="props.title"
          loading="lazy"
        />
      </figure>
      <div class="cardContent p-2 pb-0">
        <p class="cardtitle ellipsisText text-gray-500 text-2xl title">
          {{ props.title || "Title" }}
        </p>
        <p class="cardtitle text-gray-700 text-2xl font-bold">
          <span class="line-through" v-if="props.price && props.price < 700">₹700</span>
          ₹{{ props.price || "Price" }}
        </p>
        <!-- <p class="card_desc" v-if="props.description">
          {{ props.description.slice(0, 30) }}...
        </p> -->

        <span
          class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
        >
          {{ props.title }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.commonCard {
  padding: 5px;
  max-width: 24%;
  width: 100%;

  &:hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.11);
  }

  .cardimg {
    max-height: 350px;
    object-fit: cover;
  }

  .pi-heart-fill {
    position: absolute;
    left: 0;
    top: 0;
  }
}

@media (max-width: 992px) {
  .max-w-48 {
    max-width: 48%;
  }
  .commonCard {
    max-width: 23%;
  }
}

@media (max-width: 576px) {
  .commonCard {
    max-width: 48%;
  }
}
</style>
