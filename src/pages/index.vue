<script setup>
import { fetchFromSanctum } from "../utils/sanctumApi.js";

const isLoading = ref(true);

const blocks = ref([]);
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
onMounted(() => {
  getHomePageData();
});
</script>

<template>
  <template v-if="isLoading">
    <div class="lg:block hidden">
      <div class="bannerAni h-[40vh] animate-pulse rounded bg-gray-200 my-5"></div>
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
      <Highlights :data="blocks[block - 1]" v-else />
    </div>
    <div v-else>
      <CateGories></CateGories>
      <AppBanner :data="blocks[block - 1]" v-if="blocks[block - 1].type == 'Banner'" />
      <Highlights :data="blocks[block - 1]" v-else />
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
