<script setup>

const blogPosts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const data = await response.json();
    blogPosts.value = data.slice(0, 10).map(post => ({
      id: post.id,
      title: post.title,
      imgUrl: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/o/q/free-3671s2574-samah-unstitched-original-imahyhhchhk94gzk.jpeg?q=70', 
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus nobis quaerat eveniet, earum facilis, libero laborum, autem atque vero aut exercitationem accusantium? Consectetur quo earum commodi, iste voluptate eos incidunt!', 
      date: new Date().toISOString().split('T')[0],
    }));
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
      <h1 class="text-5xl font-bold text-center text-white">Blog List</h1>
    </div>
    <div class="container mx-auto p-4">            
      <div v-if="loading" class="lg:flex block flex-wrap">
        <ShimmereCard/>
        <ShimmereCard/>
        <ShimmereCard/>
        <ShimmereCard/>
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-else class="lg:flex flex-wrap gap-3 justify-between">
        <ul class="lg:flex flex-wrap gap-3 justify-center lg:w-[73%] w-[100%]">
          <li v-for="post in blogPosts" :key="post.id" class="p-3 bg-gray-50 border w-full rounded-lg shadow hover:shadow-lg transition">
            <nuxt-link :to="`/blogs/${post.id}`" class="lg:flex block">
              <img :src="post.imgUrl" alt="Blog Image" class="lg:w-[30%] w-[100%] lg:h-[250px] object-cover rounded-t-lg">
              <div class="p-4">
                <h2 class="lg:text-3xl text-2xl font-semibold mb-2 capitalize">{{ post.title }}</h2>
                <p class="mb-2 capitalize text-[15px] lg:text-justify text-left">{{ post.description.slice(0, 300) }}...</p>
                <small class="continuelink hover:pl-2 transition-all mb-2 flex items-end gap-2 text-orange-600">Continue Reading <i class="pi pi-arrow-right"></i></small>
                <small class="text-gray-500">{{ post.date }}</small>
              </div>
            </nuxt-link>
          </li>
        </ul>
        <div class="lg:w-[25%] w-[100%] rounded shadow sticky top-3 bgblue80 h-fit text-white p-3">
          <h1 class="heading lg:text-3xl text-2xl mb-2 uppercase">NEED any HELP?</h1>
          <p class="text-gray-200 mb-3">Our dedicated support team is here for you 24/7. Reach out to us with any questions or concerns, and we'll provide prompt and friendly assistance.</p>
          <NuxtLink to="tel:91999999999" target="_blank" class="heading lg:text-3xl text-2xl mb-3 flex items-center gap-2 uppercase">
            <i class="pi pi-phone lg:text-2xl text-xl"></i> 9999-999-999
          </NuxtLink>
          <BookNow 
            :bounceAni="'no-animate'" 
            bookingLink="https://api.whatsapp.com/send?phone=+910123456789&text=Hello, Looking for banarasee saree. Get in touch with me my name is"
          />
        </div>
      </div>
    </div>
  </div>
</template>


  
  <style scoped>
    .bloglistmain{}
    .container{
        max-width: 1150px;
    }
    .Booknowbtn{
        padding: 8px !important;
    }
    .bloglistbanner{
        background: url(../../assets/images/pages/pagesBanner.jpg) no-repeat;
        background-size: cover;
        padding: 100px;
        display: grid;
        place-content: center;
        place-items: center;
    }

  </style>
  