<script setup>
const blogPosts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("https://fashtsaly.com/API/public/api/WebsiteBlogs");
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const data = await response.json();
    blogPosts.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bloglistmain">
    <div class="bloglistbanner">
      <h1 class="text-5xl font-bold text-center text-white">Our Blogs</h1>
    </div>
    <div class="container mx-auto p-4">
      <div v-if="loading" class="lg:flex block flex-wrap">
        <div class="w-full">
          <div class="flex flex-col lg:flex-row gap-4 mb-8">
            <div class="shimmer w-full lg:w-5/12 h-96 rounded-lg"></div>
            <div class="shimmer lg:w-7/12 h-96 mt-4 lg:mt-0 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="lg:flex flex-wrap gap-3 justify-between">
        <ul class="lg:flex flex-wrap gap-3 justify-center lg:w-[73%] w-[100%]">
          <li
            v-for="post in blogPosts"
            :key="post.id"
            class="p-3 bg-gray-50 border w-full rounded-lg shadow hover:shadow-lg transition"
          >
            <NuxtLink :to="`/blogs/${post.id}`" class="lg:flex block">
              <img
                :src="post.image[0].source"
                alt="Blog Image"
                class="lg:w-[30%] w-[100%] lg:h-[250px] object-cover rounded-t-lg"
              />
              <div class="p-4 lg:w-[68%] w-[100%]">
                <h2 class="lg:text-xl font-semibold mb-2 capitalize">
                  {{ post.title }}
                </h2>
                <!-- <p class="mb-2 capitalize text-[15px] lg:text-justify text-left">
                  {{ post.content.slice(0, 300) }}...
                </p> -->
                <div
                  class="mb-2 capitalize text-[15px] lg:text-justify text-left"
                  v-html="post.content.slice(0, 300)"
                ></div>
                <small
                  class="continuelink hover:pl-2 transition-all mb-2 flex items-end gap-2 text-orange-600"
                  >Continue Reading <i class="pi pi-arrow-right"></i
                ></small>
                <small class="text-gray-500">{{ post.created_at }}</small>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <div
          class="lg:w-[25%] w-[100%] rounded shadow sticky top-3 bgblue80 h-fit text-white p-3"
        >
          <h1 class="heading lg:text-xl text-2xl mb-2 uppercase">NEED any HELP?</h1>
          <p class="text-gray-200 mb-3">
            Our dedicated support team is here for you 24/7. Reach out to us with any
            questions or concerns, and we'll provide prompt and friendly assistance.
          </p>
          <NuxtLink
            to="tel:91999999999"
            target="_blank"
            class="heading lg:text-3xl text-2xl mb-3 flex items-center gap-2 uppercase"
          >
            <i class="pi pi-phone lg:text-2xl text-xl"></i> 9999-999-999
          </NuxtLink>

          <NuxtLink
            to="https://api.whatsapp.com/send?phone=+910123456789&text=Hello, Looking for banarasee saree. Get in touch with me my name is"
            :class="`Booknowbtn py-3 bg-green-400 text-white capitalize rounded text-2xl text-center flex items-center gap-2 justify-center`"
            target="_blank"
            ><i class="pi pi-whatsapp lg:text-3xl text-2xl"></i> Get in Touch</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bloglistmain {
}
.container {
  max-width: 1150px;
}
.Booknowbtn {
  padding: 8px !important;
}
.bloglistbanner {
  background: url(../../assets/images/pages/pagesBanner.jpg) no-repeat;
  background-size: cover;
  padding: 50px;
  display: grid;
  place-content: center;
  place-items: center;
}
</style>
