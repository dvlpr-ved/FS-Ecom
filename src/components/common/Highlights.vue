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
    }
]
</script>

<template>
    <div class="cardWrapper py-5">
        <div class="container">
            <div class="flexHeading flex justify-between items-center pb-5">
                <h3 class="text-2xl lg:text-3xl">Highlights</h3>
                <a href="#" class="commonbtn">View All</a>
            </div>
            <div class="flex justify-center gap-3 relative">
                <carousel :items-to-show="1" >
                    <slide v-for="card in cards" :key="card.id">
                        <HomePageCard :ImgURL="card.ImgURL" :title="card.title" />
                    </slide>
                    <template #addons>
                    <navigation />
                    <pagination />
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
</style>