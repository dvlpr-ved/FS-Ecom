<template>
    <!-- will useing this design later -->
    <!-- https://www.elegantthemes.com/blog/divi-resources/how-to-create-a-dynamic-html-sitemap-page-in-divi -->
    <div class="p-4 max-w-[800px] mx-auto">
      <h1 class="text-2xl font-bold mb-4">Sitemap</h1>
      <ul class="space-y-2 flex flex-wrap gap-4 items-center">
        <li v-for="(route, index) in routes" :key="index" class="text-blue-500 w-1/3">
          <nuxt-link :to="route.url" class="hover:underline block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">{{ route.label }}</nuxt-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        routes: [
          { url: '/', label: 'Home' },
          { url: '/about', label: 'About' },
          { url: '/services', label: 'Services' },
          { url: '/contact', label: 'Contact' }
          // Add more routes as needed
        ]
      };
    }
  };
  </script>
  
  <style lang="scss"></style
  

  