<script setup>
import { ref, onMounted, computed } from 'vue';

const data = [
    {
        id: 1,
        title: 'categories 1',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg'
    },
    {
        id: 2,
        title: 'categories 2',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_03.jpg'
    },
    {
        id: 3,
        title: 'categories 3',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_02.jpg'
    },
    {
        id: 4,
        title: 'categories 4',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_03.jpg'
    },
    {
        id: 5,
        title: 'categories 5',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_06.jpg'
    },
    {
        id: 6,
        title: 'categories 6',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_07.jpg'
    },
    {
        id: 7,
        title: 'categories 7',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg'
    },
    {
        id: 9,
        title: 'categories 9',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_02.jpg'
    },
    {
        id: 10,
        title: 'categories 10',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_04.jpg'
    },
    {
        id: 11,
        title: 'categories 11',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_03.jpg'
    },
    {
        id: 12,
        title: 'categories 12',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_02.jpg'
    },
    {
        id: 13,
        title: 'categories 13',
        imgUrl: 'https://miniture.b-cdn.net/wp-content/uploads/2023/10/m7_cat_05.jpg'
    },
]

const activeIndex = ref(0);
const slideWidth = ref(0);

const prevImage = () => {
    if (activeIndex.value > 0) {
        activeIndex.value--;
    }
};

const nextImage = () => {
    if (activeIndex.value < data.length - 1) {
        activeIndex.value++;
    }
};

onMounted(() => {
    const sliderWidth = document.querySelector('.slider').clientWidth;
    slideWidth.value = sliderWidth / data.length;
});

</script>
<template>
    <div class="categories-main-div">
        <h1 class="heading">Explore Popular Categories</h1>
        <div class="Categories-wrapper flex justify-center">
            <div class="slider">
                <div class="slide" :style="{ transform: `translateX(-${activeIndex * slideWidth}px)` }">
                    <div v-for="(item, index) in data" :key="index" class="categories-card">
                        <img class="avatar" :src="item.imgUrl" />
                        <span class="categories-title">{{ item.title }}</span>
                    </div>
                </div>
            </div>
            <button @click="prevImage" :disabled="activeIndex === 0" class="controlBtn">&#x2190;</button>
            <button @click="nextImage" :disabled="activeIndex === data.length - 1"
                class="controlBtn controlBtn1">&#8594;</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.categories-main-div {
    padding: 40px 0;
    text-align: center;

    .heading {
        font-size: 30px;
        margin-bottom: 30px;
    }

    .Categories-wrapper {
        position: relative;
        gap: 30px;
        overflow: hidden;
    }

    .slider {
        display: flex;
    }
    
    .slide {
        display: flex;
        transition: transform 0.4s ease;
    }

    .categories-card {
        flex: 0 0 auto;
        width: calc(100% / 7);
        max-width: 250px;
        text-align: center;
        padding: 10px;
    }

    .avatar {
        height: 120px;
        width: 120px;
        object-fit: cover;
        border-radius: 50%;
    }

    .categories-title {
        display: block;
    }

    .controlBtn {
        left: 0;
    }

    .controlBtn1 {
        left: inherit;
        right: 0;
    }
}
</style>
