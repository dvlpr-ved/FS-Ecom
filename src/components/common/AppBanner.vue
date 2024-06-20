<script setup>
import { ref } from 'vue';

const images = [
    'https://blogs.rmkv.com/wp-content/uploads/2023/11/models-with-sarees-rmkv-blog-banner-1024x576.jpg',
    'https://i.pinimg.com/originals/9e/c5/cd/9ec5cdfe4d18f004394209d1fb0ddebb.jpg',
    'https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg',
    'https://i.pinimg.com/originals/44/c8/09/44c8091ede64503d6a16d3f3fd96438a.jpg',
];

const activeIndex = ref(0);

const prevImage = () => {
    if (activeIndex.value > 0) {
        activeIndex.value--;
    }
};

const nextImage = () => {
    if (activeIndex.value < images.length - 1) {
        activeIndex.value++;
    }
};

const getImageClasses = (index) => {
    return {
        'slider-image': true,
        'active': index === activeIndex.value,
        'next': index === getNextIndex(),
        'prev': index === getPrevIndex()
    };
};

const getNextIndex = () => {
    return (activeIndex.value + 1) % images.length;
};

const getPrevIndex = () => {
    return (activeIndex.value - 1 + images.length) % images.length;
};
</script>

<template>
    <div class="BannerWrapper">
        <div class="sliderItem">
            <img v-for="(img, index) in images" :key="index" :src="img" :class="getImageClasses(index)" :alt="img" />
        </div>
        <div class="controls">
            <button @click="prevImage" :disabled="activeIndex === 0" class="controlBtn">&#x2190;</button>
            <button @click="nextImage" :disabled="activeIndex === images.length - 1"
                class="controlBtn controlBtn1">&#8594;</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.BannerWrapper {
    position: relative;
    overflow: hidden;
}

.sliderItem {
    position: relative;
    width: 100%;
    height: 550px;
}

.slider-image {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease;
    object-fit: cover;
}

.active {
    opacity: 1;
    z-index: 1;
}

.hidden {
    display: none;
}

.next {
    transform: translateX(100%);
    opacity: 0;
    z-index: 0;
}

.prev {
    transform: translateX(-100%);
    opacity: 0;
    z-index: 0;
}
</style>