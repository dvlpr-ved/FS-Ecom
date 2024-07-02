<script setup>
import { ref } from 'vue';

const images = [
    'https://anyaonline.in/cdn/shop/collections/IMG_0552.png?v=1645617984',
    'https://img.freepik.com/free-vector/happy-diwali-sale-banner-with-diya-marigold-flower_1017-21234.jpg?t=st=1718820636~exp=1718824236~hmac=b4ff16559985950523c5909b9fc9e5da003080464b0b8408741fdedcf8e3cf59&w=1380',
    'https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg',
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
    <div class="BannerWrapper py-4">
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
}

.sliderItem {
    position: relative;
    width: 100%;
    height: 490px;
    overflow: hidden;
    border-radius: 0 0 15px 15px;
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

@media (max-width:992px) {

    .sliderItem {
        height: 270px;
    }

    .controlBtn {
        bottom: 40%;
        height: 35px;
        width: 35px;
        font-size: 14px;
    }
}
</style>