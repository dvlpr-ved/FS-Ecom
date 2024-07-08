
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
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis quaerat eveniet, earum facilis, libero laborum, autem atque vero aut exercitationem accusantium? Consectetur quo earum commodi, iste voluptate eos incidunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis quaerat eveniet, earum facilis, libero laborum, autem atque vero aut exercitationem accusantium? Consectetur quo earum commodi, iste voluptate eos incidunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis quaerat eveniet, earum facilis, libero laborum, autem atque vero aut exercitationem accusantium? Consectetur quo earum commodi, iste voluptate eos incidunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis quaerat eveniet, earum facilis, libero laborum, autem atque vero aut exercitationem accusantium? Consectetur quo earum commodi, iste voluptate eos incidunt!',
      date: new Date().toISOString().split('T')[0],
    };
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
    <div class="blogdetailmain relative">
      <div class="blogdetailbanner">
          <img :src="blogPost ? blogPost.imgUrl : ''" alt="Blog Image" class="w-full h-full max-h-[400px] object-cover">
        </div>
        <div class="container mx-auto p-4 rounded-lg shadow my-5">
        <h1 class="lg:text-5xl text-2xl font-bold text-red-500 mb-3">{{ blogPost ? blogPost.title : '' }}</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error  }}</div>
        <div v-else class="">
          <!-- <img :src="blogPost ? blogPost.imgUrl : ''" alt="Blog Image" class="w-full h-[300px] object-cover rounded-t-lg mb-4"> -->
          <p class="text-lg lg:text-justify text-left">{{blogPost ?  blogPost.description : '' }}</p>
          <small class="text-gray-500">{{ blogPost ? blogPost.date : '' }}</small>
        </div>
      </div>
    </div>
</template>

  
  <style scoped>
  .container {
    max-width: 1150px;
  }

  </style>
  