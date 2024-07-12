<script setup lang="ts">
const props = defineProps<{
  images?: string;
  title?: string;
  id?: number;
  price?: number;
  description?: string;
}>();
</script>

<template>
  <div class="commonCard shadow transition border relative">
    <div class="watchListIcons absolute top-[15px] z-10 right-[15px] cursor-pointer">
      <i class="text-4xl pi pi-heart" style="color: rgb(239 68 68)"></i>
      <i class="text-4xl pi pi-heart-fill" style="color: rgb(239 68 68)"></i>
    </div>
    <a :href="`../searchresult/${id}`">
      <figure class="relative">
        <!-- <img class="w-full cardimg" :src="props.images" :alt="props.title" loading="lazy"> -->
        <img
          class="w-full cardimg"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/o/q/free-3671s2574-samah-unstitched-original-imahyhhchhk94gzk.jpeg?q=70"
          :alt="props.title"
          loading="lazy"
        />
      </figure>
      <div class="cardContent p-2 pb-0">
        <!-- <p class="cardtitle text-gray-500 font-bold">{{ title }}</p> -->
        <p class="cardtitle text-gray-500 text-2xl title">Banarasee Sarees</p>
        <p class="cardtitle text-gray-700 text-2xl font-bold">
          ₹{{ props.price }} <span class="line-through">₹700</span>
        </p>
        <!-- <p class="card_desc">{{ description.slice(0, 30) }}...</p> -->
      </div>
    </a>
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
    display: none;
  }

  .pi-heart {
    &:hover {
      display: none;

      + .pi-heart-fill {
        display: block;
      }
    }
  }
}

@media (max-width: 768px) {
  .max-w-48 {
    max-width: 48%;
  }
  .commonCard {
    max-width: 31%;
  }
}

@media (max-width: 576px) {
  .commonCard {
    max-width: 48%;
  }
}
</style>
