<script setup>
const data = [
  {
    id: 1,
    title: "categories 1",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
  },
  {
    id: 2,
    title: "categories 2",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_03.jpg",
  },
  {
    id: 3,
    title: "categories 3",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_02.jpg",
  },
  {
    id: 4,
    title: "categories 4",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_03.jpg",
  },
  {
    id: 5,
    title: "categories 5",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_06.jpg",
  },
  {
    id: 6,
    title: "categories 6",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_07.jpg",
  },
  {
    id: 7,
    title: "categories 7",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
  },
  {
    id: 9,
    title: "categories 9",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_02.jpg",
  },
  {
    id: 10,
    title: "categories 10",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_04.jpg",
  },
  {
    id: 11,
    title: "categories 11",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_03.jpg",
  },
  {
    id: 12,
    title: "categories 12",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_02.jpg",
  },
  {
    id: 13,
    title: "categories 13",
    imgUrl: "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg",
  },
];

const itemsToShow = ref(4);
const isLoading = ref(true);

const updateItemsToShow = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 576) {
    itemsToShow.value = 4;
  } else if (screenWidth < 768) {
    itemsToShow.value = 6;
  } else if (screenWidth < 1024) {
    itemsToShow.value = 7;
  } else if (screenWidth < 1440) {
    itemsToShow.value = 9;
  } else {
    itemsToShow.value = 9;
  }
};

onMounted(() => {
  window.addEventListener("resize", updateItemsToShow);
  updateItemsToShow();
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsToShow);
});
</script>

<template>
  <div class="categories-main-div lg:py-5 py-3 text-center">
    <div class="container">
      <h1 class="heading lg:text-5xl text-2xl mb-5">Explore Popular Categories</h1>
      <template v-if="isLoading">
        <!-- for desk -->
        <div class="lg:flex justify-between hidden gap-5">
          <div
            class="p-[70px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[70px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[70px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[70px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[70px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[70px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
        </div>
        <!-- for mb -->
        <div class="flex lg:hidden justify-between">
          <div
            class="p-[50px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[50px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
          <div
            class="p-[50px] animate-pulse bg-gray-50"
            style="border-radius: 100%"
          ></div>
        </div>
      </template>

      <div v-else class="slidesWraper flex justify-center gap-3 relative">
        <carousel :items-to-show="itemsToShow">
          <slide v-for="(item, index) in data" :key="index" class="categories-card">
            <div class="avt-wrap">
              <img
                class="avatar"
                :src="item.imgUrl ? item.imgUrl : 'assets/images/img.jpg'"
                :alt="item.title"
                loading="lazy"
              />
              <span class="categories-title hidden">{{ item.title }}</span>
            </div>
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
.categories-main-div {
  background-color: var(--gray);
  .avatar {
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin: 0 auto;
    transition: all 0.4s ease;
    // border: 5px solid var(--primary);
    // padding: 6px;
    // background: #fff;

    &:hover {
      transform: scale(1.1);
    }
  }
}

@media (max-width: 576px) {
  .categories-main-div {
    .avatar {
      height: 90px;
      width: 90px;
    }
  }
}
</style>
