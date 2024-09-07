<script setup>
const { data,listing_id } = defineProps({
  data: {
    type: Object,
  },
  listing_id : {
    default : 0
  }
});
const itemsToShow = ref(4);
const updateItemsToShow = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 576) {
    itemsToShow.value = 2;
  } else if (screenWidth < 768) {
    itemsToShow.value = 3;
  } else if (screenWidth < 1024) {
    itemsToShow.value = 4;
  } else if (screenWidth < 1440) {
    itemsToShow.value = 5;
  } else {
    itemsToShow.value = 5;
  }
};

onMounted(() => {
  window.addEventListener("resize", updateItemsToShow);
  updateItemsToShow();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsToShow);
});
</script>

<template>
  <div class="similarCardWrapper highCardMain lg:py-1 py-1 bg-gray-200">
    <div class="container bg-gray-100">
      <div class="flexHeading flex justify-between items-center lg:py-1 py-1">
        <h3 class="text-xl lg:text-xl">{{ data.name }}</h3>
        <NuxtLink :href="'searchresult?listing_id='+listing_id" class="commonbtn lg:block hidden"
          >View All</NuxtLink
        >
        <NuxtLink href="searchresult" class="lg:hidden block">
          <i class="pi pi-chevron-circle-right text-orange-500 text-4xl"></i>
        </NuxtLink>
      </div>
      <div class="relative pb-5">
        <carousel :items-to-show="itemsToShow" :wrap-around="true">
          <slide v-for="card in data.products" :key="card.id">
            <HomePageCard
              :hidePrice="true"
              :thumbnail="card.images"
              :title="card.name"
              :id="card.id"
            />
          </slide>
          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.highCardMain {
  .rmvPriceFromHome {
    display: none;
  }
}
.similarCardWrapper {
  &:hover .carousel__prev,
  &:hover .carousel__next {
    opacity: 1;
  }

  .carousel__icon {
    filter: invert(1);
  }

  .carousel__prev,
  .carousel__next {
    opacity: 0;
    height: 68px;
    width: 40px;
    background: #fff;
    transition: all 0.5s ease;
    svg {
      filter: unset;
      fill: #717171;
    }

    &:hover {
      filter: brightness(1.2);
    }
  }
}

@media (max-width: 768px) {
  .similarCardWrapper {
    overflow-x: hidden;

    .carousel__prev,
    .carousel__next {
      height: 35px;
      width: 35px;
      font-size: 17px;
    }
  }
}
@media (max-width: 576px) {
  .similarCardWrapper {
    .carousel__prev {
      left: 0;
    }
    .carousel__next {
      right: 0;
    }
  }
}
</style>
