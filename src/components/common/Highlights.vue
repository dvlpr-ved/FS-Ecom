<script setup>
const cards = [
    {
        id: 1,
        ImgURL: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/models-with-sarees-rmkv-blog-banner-1024x576.jpg',
        title: 'Highlight 1 Title'
    },
    {
        id: 2,
        ImgURL: 'https://i.pinimg.com/originals/9e/c5/cd/9ec5cdfe4d18f004394209d1fb0ddebb.jpg',
        title: 'Highlight 2 Title'
    },
    {
        id: 3,
        ImgURL: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg',
        title: 'Highlight 3 Title'
    },
    {
        id: 4,
        ImgURL: 'https://i.pinimg.com/originals/44/c8/09/44c8091ede64503d6a16d3f3fd96438a.jpg',
        title: 'Highlight 4 Title'
    },
    {
        id: 5,
        ImgURL: 'https://blogs.rmkv.com/wp-content/uploads/2023/11/models-with-sarees-rmkv-blog-banner-1024x576.jpg',
        title: 'Highlight 5 Title'
    }
]

const itemsToShow = ref(4);
const isLoading = ref(true);

const updateItemsToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        itemsToShow.value = 1;
    } else if (screenWidth < 1024) {
        itemsToShow.value = 2;
    } else if (screenWidth < 1440) {
        itemsToShow.value = 3;
    } else {
        itemsToShow.value = 4;
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
    <div class="cardWrapper py-5">
        <div class="container">
            <div class="flexHeading flex justify-between items-center pb-5">
                <h3 class="text-2xl lg:text-3xl">Highlights</h3>
                <a href="#" class="commonbtn">View All</a>
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
                        <HomePageCard :ImgURL="card.ImgURL" :title="card.title" />
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
.cardWrapper {
    background: #f5f5f5ab;
}

.carousel__icon {
    filter: invert(1);
}

.carousel__prev,
.carousel__next {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background: var(--primary);

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

    .carousel__prev {
        left: 45px;
    }

    .carousel__next {
        right: 45px;
    }
}
</style>