<script setup lang="ts">
const {data} = defineProps({
  data : {
    default : () => ""
  }
});
onMounted(() => {
if(document.getElementsByClassName('image-container')){
    const imageContainer = document.querySelector('.image-container');
    if(imageContainer){
        const image = imageContainer.querySelector('img');

            imageContainer.addEventListener('mousemove', function (e) {
                const rect = imageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;

                image.style.setProperty('--mouse-x', `${xPercent}%`);
                image.style.setProperty('--mouse-y', `${yPercent}%`);
            });
        }
    }
})
</script>

<template>
<div class="image-container">
    <img :src="data"  alt="Image">
</div>
</template>

<style lang="scss" scoped>
.image-container {
    overflow: hidden; 
    width: 100%; 
    height: 500px;
}

.image-container img {
    width: 100%; 
    height: 100%; 
    transition: transform 0.3s ease, transform-origin 0.3s ease; 
}

.image-container:hover img {
    transform: scale(1.8); 
}

.image-container img:hover {
    transform-origin: var(--mouse-x) var(--mouse-y); 
}
</style>