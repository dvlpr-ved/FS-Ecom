<script setup>
const cards = [
    {
        id: 1,
        title: 'Highlight 1 Title',
        thumbnail: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/models-with-sarees-rmkv-blog-banner-1024x576.jpg',
    },
    {
        id: 2,
        title: 'Highlight 2 Title',
        thumbnail: 'https://i.pinimg.com/originals/9e/c5/cd/9ec5cdfe4d18f004394209d1fb0ddebb.jpg',
    },
    {
        id: 3,
        title: 'Highlight 3 Title',
        thumbnail: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg',
    },
    {
        id: 4,
        title: 'Highlight 4 Title',
        thumbnail: 'https://i.pinimg.com/originals/44/c8/09/44c8091ede64503d6a16d3f3fd96438a.jpg',
    },
    {
        id: 5,
        title: 'Highlight 5 Title',
        thumbnail: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/models-with-sarees-rmkv-blog-banner-1024x576.jpg',
    },
    {
        id: 6,
        title: 'Highlight 3 Title',
        thumbnail: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg',
    },
]

const itemsToShow = ref(4);
const isLoading = ref(true);

const updateItemsToShow = () => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 576) {
        itemsToShow.value = 1;
    } else if (screenWidth < 768) {
        itemsToShow.value = 2;
    } else if (screenWidth < 1024) {
        itemsToShow.value = 3;
    } else if (screenWidth < 1440) {
        itemsToShow.value = 4;
    } else {
        itemsToShow.value = 5;
    }
};

onMounted(() => {
    window.addEventListener('resize', updateItemsToShow);
    updateItemsToShow();
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateItemsToShow);
});

</script>

<template>
    <div class="cardWrapper py-5 bg-gray-200">
        <div class="container bg-white">
            <div class="flexHeading flex justify-between items-center py-5">
                <h3 class="text-2xl lg:text-3xl">Highlights</h3>
                <a href="searchresult" class="commonbtn">View All</a>
            </div>
            <template v-if="isLoading">
                <div class="lg:flex hidden justify-between">
                    <ShimmereCard/>
                    <ShimmereCard/>
                    <ShimmereCard/>
                    <ShimmereCard/>
                </div>
            </template>
            <div v-else class="flex justify-center gap-3 relative">
                <carousel :items-to-show="itemsToShow">
                    <slide v-for="card in cards" :key="card.id">
                        <HomePageCard :thumbnail="card.thumbnail" :title="card.title" />
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


.carousel__icon {
    filter: invert(1);
}

.carousel__prev,
.carousel__next {
    height: 68px;
    width: 40px;
    background: #fff;
    svg{ filter:unset; fill:#717171}

    &:hover {
        filter: brightness(1.2);
    }
}

@media (max-width:768px) {
    .cardWrapper {
        overflow-x: hidden;
    }

    .carousel__prev,
    .carousel__next {
        height: 35px;
        width: 35px;
        font-size: 17px;
    }
}
@media (max-width:576px) {
    .carousel__prev {
        left: 45px;
    }

    .carousel__next {
        right: 45px;
    }
}
</style>