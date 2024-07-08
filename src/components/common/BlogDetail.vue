<template>
    <div class="blogdetailmain">
      <div class="blogdetailbanner">
        <h1 class="text-5xl font-bold text-center text-white">{{ blogPost.title }}</h1>
      </div>
      <div class="container mx-auto p-4">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else class="p-4 bg-gray-50 border rounded-lg shadow">
          <img :src="blogPost.imgUrl" alt="Blog Image" class="w-full h-auto object-cover rounded-t-lg mb-4">
          <p class="text-lg">{{ blogPost.description }}</p>
          <small class="text-gray-500">{{ blogPost.date }}</small>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const blogPost = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const route = useRoute();
  
  onMounted(async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${route.params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      blogPost.value = {
        id: data.id,
        title: data.title,
        imgUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/o/q/free-3671s2574-samah-unstitched-original-imahyhhchhk94gzk.jpeg?q=70',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis quaerat eveniet, earum facilis, libero laborum, autem atque vero aut exercitationem accusantium? Consectetur quo earum commodi, iste voluptate eos incidunt!',
        date: new Date().toISOString().split('T')[0],
      };
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1150px;
  }
  .blogdetailbanner {
    background: url(../../assets/images/pages/pagesBanner.jpg) no-repeat;
    background-size: cover;
    padding: 100px;
    display: grid;
    place-content: center;
    place-items: center;
  }
  </style>
  