<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  images?: string;
  title?: string;
  id?: number;
  price?: number;
  description?: string;
}>();

const apiAddToCartStore = useAddToCartStore();

const showFilledHeart = ref(false);
const isAdded = ref(false);

const addToCart = async (product_id: number) => {
  try {
    const success = await apiAddToCartStore.fetchAddToCart({ product_id });
    if (success) {
      isAdded.value = true;
    }
  } catch (error) {
    console.error("Error Adding Product In Cart:", error);
  }
};
</script>

<template>
  <div class="commonCard shadow transition border relative">
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
          v-if="showFilledHeart || isAdded"
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
        <p class="cardtitle text-gray-500 text-2xl title">{{ props.title || "Title" }}</p>
        <p class="cardtitle text-gray-700 text-2xl font-bold">
          <span class="line-through" v-if="props.price && props.price < 700">₹700</span>
          ₹{{ props.price || "Price" }}
        </p>
        <p class="card_desc" v-if="props.description">
          {{ props.description.slice(0, 30) }}...
        </p>
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
