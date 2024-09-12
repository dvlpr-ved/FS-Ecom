<script setup>
const products = ref([]);
const itemsToShow = ref(5);
const isLoading = ref(true);

async function getMostViewProducts() {
  try {
    const response = await fetch(
      "https://fashtsaly.com/API/public/api/getMostViewedProducts",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    products.value = data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    isLoading.value = false;
  }
}

function getImageUrl(imagesJson) {
  try {
    const images = JSON.parse(imagesJson);
    return images.length > 0 ? images[0].source : null;
  } catch (error) {
    console.error("Error parsing images JSON:", error);
    return null;
  }
}

onMounted(() => {
  getMostViewProducts();
});
</script>

<template>
  <!-- <div v-for="(cards, index) in products" :key="index">
    {{ cards.images }}
  </div> -->
  <div class="mostViewedProducts py-3 bg-gray-100">
    <div class="lg:text-2xl text-xl mb-3 pl-2 capitalize" v-if="isLoading">loading...</div>
    <h4 class="lg:text-2xl text-xl mb-3 pl-2 capitalize">Most Viewd products</h4>

    <div v-if="products.length > 4" class="caroselMostViewd">
      <carousel :items-to-show="itemsToShow">
        <slide
          v-for="(cards, index) in products"
          :key="index"
          class="relative tooltipGroup"
        >
          <NuxtLink
            class="mx-1 block border border-gray-200 p-1"
            :to="`../searchresult/${cards.id}`"
          >
            <figure class="relative">
              <img
                v-if="getImageUrl(cards.images)"
                :src="getImageUrl(cards.images)"
                alt="Product Image"
                class="w-full cardimg lg:h-[335px] lg:w-[265px] h-[201px] object-cover"
                loading="lazy"
              />
            </figure>
            <div class="cardContent p-2 pb-0">
              <p class="cardtitle ellipsisText text-gray-600 lg:text-xl title">
                {{ cards.name || "Title" }}
              </p>
              <p class="cardtitle rmvPriceFromHome text-gray-700 text-2xl font-bold">
                <span class="line-through text-2xl">₹700</span>
                ₹ {{ cards.mrp || "Price" }}
              </p>

              <!-- <span class="bgblue80 py-1 px-2 block w-fit capitalize mt-1 text-white"
              >save 20%</span
            > -->

              <span
                class="tooltip absolute left-0 right-0 bottom-[14%] w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >
                {{ cards.name }}
              </span>
            </div>
          </NuxtLink>
        </slide>
        <template #addons>
          <navigation />
        </template>
      </carousel>
    </div>

    <div v-else class="flexdiv flex flex-wrap">
      <div
        v-for="(cards, index) in products"
        :key="index"
        class="relative tooltipGroup gap-2 lg:w-[20%] w-[49%]"
      >
        <NuxtLink
          class="block border border-gray-200 p-1"
          :to="`../searchresult/${cards.id}`"
        >
          <figure class="relative">
            <img
              v-if="getImageUrl(cards.images)"
              :src="getImageUrl(cards.images)"
              alt="Product Image"
              class="w-full cardimg lg:h-[335px] lg:w-[265px] h-[201px] object-cover"
              loading="lazy"
            />
          </figure>
          <div class="cardContent p-2 pb-0">
            <p class="cardtitle ellipsisText text-gray-600 lg:text-xl title">
              {{ cards.name || "Title" }}
            </p>
            <p class="cardtitle rmvPriceFromHome text-gray-700 text-2xl font-bold">
              <span class="line-through text-2xl">₹700</span>
              ₹ {{ cards.mrp || "Price" }}
            </p>

            <!-- <span class="bgblue80 py-1 px-2 block w-fit capitalize mt-1 text-white"
              >save 20%</span
            > -->

            <span
              class="tooltip absolute left-0 right-0 bottom-[14%] w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
            >
              {{ cards.name }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mostViewedProducts {
  .carousel__icon {
    filter: invert(1);
  }

  .carousel__prev {
    left: 0;
  }
  .carousel__next {
    right: 0;
  }
  .carousel__prev,
  .carousel__next {
    height: 68px;
    width: 40px;
    background: #fff;
    transition: all 0.5s ease;
    svg {
      filter: unset;
      fill: #717171;
    }
  }
}
@media (max-width: 768px) {
}
@media (max-width: 576px) {
}
</style>
