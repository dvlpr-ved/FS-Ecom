<script setup lang="ts">
const { data } = defineProps({
  data: {
    default: () => "",
  },
});
onMounted(() => {
  const imageContainer = document.querySelector(".image-container");
  if (imageContainer) {
    const image = imageContainer.querySelector("img");

    const updatePosition = (x, y, rect) => {
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      image.style.setProperty("--mouse-x", `${xPercent}%`);
      image.style.setProperty("--mouse-y", `${yPercent}%`);
    };

    const handleMove = (e) => {
      const rect = imageContainer.getBoundingClientRect();
      let x, y;
      if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      updatePosition(x, y, rect);
    };

    imageContainer.addEventListener("mousemove", handleMove);
    imageContainer.addEventListener("touchmove", handleMove);
  }
});
</script>

<template>
  <div class="image-container" draggable>
    <img class="img_lg" :src="data" alt="Image" />
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  overflow: hidden;
  width: 100%;
  height: 420px;
}

.image-container .img_lg {
  max-height: 416px;
  max-width: 416px;
  margin: 0 auto;
  cursor: grab;
  transition: transform 0.3s ease, transform-origin 0.3s ease;
  /*object-fit: cover;*/
}

.image-container:hover .img_lg {
  transform: scale(1.8);
}

.image-container .img_lg:hover {
  transform-origin: var(--mouse-x) var(--mouse-y);
}
</style>
