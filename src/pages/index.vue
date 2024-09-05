<script setup>
useSeoMeta({
  title: "Online Shopping Site for Reselling Products",
  keywords:
    "Online Shopping in India, online Shopping store, Online Shopping Site, Buy Online, Shop Online, Online.",
  description: "Online Shopping Site for Reselling Products",
});

import { fetchFromSanctum } from "../utils/sanctumApi.js";

const isLoading = ref(true);

const blocks = ref([]);
const recently_viewed = ref();
const getHomePageData = async () => {
  const config = useRuntimeConfig();
  const data = await fetchFromSanctum({
    method: "POST",
    url: `${
      config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
    }api/getHomePageData`,
  });
  if (data.success) {
    blocks.value = data.data;
    isLoading.value = false;
  }
};
const ApiGetWhishlistItems = useWishlistStore();
const wishlistItems = computed(() => ApiGetWhishlistItems.getWishlist || []);
onMounted(() => {
  getHomePageData();
  if(localStorage.getItem("visitedProducts"))
  {
    recently_viewed.value = JSON.parse(localStorage.getItem("visitedProducts"));
  }
});

</script>

<template>
  <template v-if="isLoading">
    <div class="lg:block hidden">
      <div
        class="bannerAni h-[40vh] animate-pulse shimmer rounded bg-gray-200 my-5"
      ></div>
      <div class="cardsAni flex gap-2">
        <ShimmereCard />
        <ShimmereCard />
        <ShimmereCard />
        <ShimmereCard />
      </div>
    </div>
    <div class="lg:hidden block">
      <div class="bannerAni h-[40vh] animate-pulse rounded bg-gray-200 my-5"></div>
      <div class="cardsAni flex gap-2">
        <ShimmereCard />
        <ShimmereCard />
      </div>
    </div>
  </template>

  <template v-else-if="blocks.length === 0">
    <h1 class="text-2xl">we are facing some technical issues</h1>
  </template>

  <div v-for="block in blocks.length">
    <div v-if="block != 2">
      <AppBanner :data="blocks[block - 1]" v-if="blocks[block - 1].type == 'Banner'" />
      <Highlights :data="blocks[block - 1]" :listing_id="blocks[block - 1].listing_id" v-else />
    </div>
    <div v-else>
      <CateGories></CateGories>
      <AppBanner :data="blocks[block - 1]" v-if="blocks[block - 1].type == 'Banner'" />
      <Highlights :data="blocks[block - 1]" :listing_id="blocks[block - 1].listing_id" v-else />
    </div>
  </div>
  <div class="fixedSectiopn py-2 bg-gray-200">
    <div class="deviderFixedSection container bg-gray-100 flex flex-wrap justify-between gap-y-4">
      <div v-if="recently_viewed" class="wishlistedOnHome border border-gray-300 my-3 rounded p-2 lg:w-[49.6%] w-[100%]">
        <div class="flexHeading flex justify-between items-center mb-2">
          <h6 class="text-xl">Recently Viewed</h6>
          <NuxtLink href="wishlist" class="block">
            <i class="pi pi-chevron-circle-right text-orange-500 text-3xl"></i>
          </NuxtLink>
        </div>
    
        <div class="gridViews flex flex-wrap gap-y-2 lg:gap-x-3 gap-x-1">
          <div v-for="recent_prod in recently_viewed" class="commonCard border lg:w-[32%] w-[49%] tooltipGroup relative">
            <NuxtLink :to="`/searchresult/${recent_prod.id}`">
              <div class="imgsdiv">
                <img
                  class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                  :src="recent_prod.images[0].source"
                  alt="highlight img"
                  loading="lazy"
                />
              </div>
              <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
                {{ recent_prod.name }}
                <!-- {{ props.title.slice(0, 28) }} -->
              </p>
              <span
                class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >
                {{ recent_prod.name }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>      
      <div v-if="wishlistItems.length > 0" class="recentViewd border border-gray-300 my-3 rounded p-2 lg:w-[49.6%] w-[100%]">
        <div class="flexHeading flex justify-between items-center mb-2">
          <h6 class="text-xl">Wishlist</h6>
          <NuxtLink href="#" class="block">
            <i class="pi pi-chevron-circle-right text-orange-500 text-3xl"></i>
          </NuxtLink>
        </div>
        <div class="gridViews flex flex-wrap gap-y-2 lg:gap-x-3 gap-x-1">
          <div v-for="product in wishlistItems" :key="product.id" class="commonCard border lg:w-[32%] w-[49%] tooltipGroup relative">
            <NuxtLink :to="`/searchresult/${product.id}`">
              <div class="imgsdiv">
                <img
                  class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                  :src="product.images[0].source"
                  alt="highlight img"
                  loading="lazy"
                />
              </div>
              <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
                {{product.name}}
                <!-- {{ props.title.slice(0, 28) }} -->
              </p>
              <span
                class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >
                {{ product.name }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/*.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}*/

@media (max-width: 768px) {
  .hideFromHome {
    /*display: none;*/
  }
}
</style>
