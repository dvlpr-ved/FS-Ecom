<script setup>
import { useRoute } from "vue-router";

const blogPost = ref(null);
const loading = ref(true);
const error = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const response = await fetch(
      `https://fashtsaly.com/API/public/api/WebsiteBlogs/${route.params.id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }
    const data = await response.json();
    blogPost.value = {
      id: data.id,
      title: data.title,
      imgUrl: data.image && data.image[0]?.source,
      description: data.content || "No description available",
      date: data.created_at || "Unknown date",
    };
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="blogdetailmain py-5 bg-gray-50">
    <div class="container flex flex-col lg:flex-row gap-4">
      <template v-if="loading">
        <div class="w-full flex flex-col lg:flex-row gap-4">
          <div class="shimmer w-full lg:w-5/12 h-96 rounded-lg"></div>
          <div class="shimmer lg:w-7/12 h-96 mt-4 lg:mt-0 rounded-lg"></div>
        </div>
      </template>

      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

      <template v-else>
        <div class="w-full lg:w-5/12 p-4 lg:order-1 order-2">
          <h1 class="text-xl lg:text-2xl mb-3">{{ blogPost.title }}</h1>
          <div>
            <p
              class="text-lg lg:text-justify desctext mb-3"
              v-html="blogPost.description"
            ></p>
            <small class="text-gray-500">{{ blogPost.date }}</small>
          </div>
        </div>

        <div
          class="blogdetailbanner lg:w-7/12 lg:order-2 order-1 h-fit lg:sticky static top-0"
        >
          <img
            :src="
              blogPost.imgUrl ? blogPost.imgUrl : '_nuxt/assets/images/common/noImage.jpg'
            "
            alt="Blog Image"
            class="lg:max-h-[500px] w-full object-cover"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.blogdetailmain {
  .desctext {
    line-height: 27px;
  }
  .container {
    max-width: 1150px;
  }
}
</style>
