<script setup lang="ts">
const props = defineProps<{
  searchByImageVisible: boolean;
  closeSearchByImage: () => void;
}>();

const emit = defineEmits(["closeSearchByImage"]);
function closeSearchByImage() {
  emit("closeSearchByImage");
}
</script>
<template>
  <div
    v-if="props.searchByImageVisible"
    class="searchbyImagesmain lg:fixed relative lg:z-20 top-0 bg-white left-0 right-0 bottom-0 w-full h-full lg:overflow-y-auto"
  >
    <div class="searchbyImagesmain_in lg:p-8 p-1 relative">
      <span
        class="absolute lg:block hidden top-5 right-5 cursor-pointer bgorange text-white p-2"
        @click="closeSearchByImage"
      >
        <i class="pi pi-times text-4xl"></i>
      </span>
      <div class="flex flex-wrap justify-center gap-y-2 lg:gap-x-3 gap-x-1">
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
        <div class="commonCard border lg:w-[15%] w-[49%] tooltipGroup relative">
          <NuxtLink to="`/searchresult/`">
            <div class="imgsdiv">
              <img
                class="w-full cardImg bg-gray-200 lg:h-[270px] h-[250px] object-cover"
                alt="highlight img"
                src="https://fashtsaly.com/API/public/uploads/AF 205.jpg"
                loading="lazy"
              />
            </div>
            <p class="ellipsisText lg:text-xl text-xl text-center pt-3 capitalize">
              product name
            </p>
            <span
              class="tooltip absolute left-0 right-0 bottom-10 w-fit m-auto bgorange text-white p-1 rounded whitespace-no-wrap transition-opacity duration-300 z-10"
              >product name</span
            >
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.searchbyImagesmain {
}
</style>
