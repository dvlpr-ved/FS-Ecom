<script setup>
import {fetchFromSanctum} from '../utils/sanctumApi.js'

const blocks = ref([]);
const getHomePageData = async () => {
  const config = useRuntimeConfig();
  const data = await fetchFromSanctum({method : 'POST' , 'url' : `${config.API_BASE_URL ? config.API_BASE_URL : 'https://fashtsaly.com/API/public/'}api/getHomePageData`});
  if(data.success){
    blocks.value = data.data;
  }
}
onMounted(() => {
  getHomePageData();
});
</script>

<template>
  <div v-for="block in blocks.length">
    <div v-if="block != 2">
      <AppBanner :data="blocks[block-1]" v-if="blocks[block-1].type=='Banner'" />      
      <Highlights :data="blocks[block-1]" v-else/>      
    </div>
    <div v-else>
      <CateGories></CateGories>
      <AppBanner :data="blocks[block-1]" v-if="blocks[block-1].type=='Banner'" />      
      <Highlights :data="blocks[block-1]" v-else/>
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
