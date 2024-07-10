<script lang="ts">

</script>

<template>
  <footer class="AppFooter lg:pt-6 pt-4">
    <div class="container py-4">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 gap-y-[5px] gap-x-[20px] justify-center">
          <!-- Company -->
          <a href="../about" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">About Us</a>
          <a href="../contactus" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Contact Us</a>
          <a href="../blogs" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Blogs</a>
          
          <!-- Policies -->
          <a href="../privacy-policy" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Privacy Policy</a>
          <a href="../payment-policy" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Payment Policy</a>
          <a href="../return-exchange-policy" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Return & Exchange Policy</a>
          <a href="../cancellation-policy" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Cancellation Policy</a>
          <a href="../subscriber-policy" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Subscriber Policy</a>
          
          <!-- Selling -->
          <a href="../become-seller" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Become a Seller</a>
          <a href="../advertise" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Advertise</a>
          
          <!-- Support -->
          <a href="../faq" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">FAQ</a>
          <a href="../sitemap" class="block p-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition duration-300 ease-in-out">Sitemap</a>
      </div>
  
  
      <!-- <div class="footerFlex">
        <ul class="flex justify-between fwrap">
          <li class="lg:w-[36%] w-[100%] lg:mb-0 mb-4">
            <a href="" class="text-5xl mb-4">Logo Here</a>
            <p class="aboutcontent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptas labore
              velit repellat fugiat suscipit maxime expedita rerum adipisci provident doloremque ullam, quis veritatis
              voluptatem soluta eum hic odit temporibus.</p>
          </li>
          <li class="lg:w-[15%] w-[48%] lg:mb-0 mb-4">
            <div class="title font-bold text-2xl capitalize mb-4">information</div>
            <a href="../about">about us</a>
            <a href="../contactus">Contact us</a>
            <a href="#">privacy policy</a>
            <a href="#">return policy</a>
            <a href="#">shipping policy</a>
          </li>
          <li class="lg:w-[15%] w-[48%] lg:mb-0 mb-4">
            <div class="title font-bold text-2xl capitalize mb-4">account</div>
            <a href="../orders">my order</a>
            <a href="../whitelist">my Whitelist</a>
            <a href="#">account details</a>
            <a href="#">shipping policy</a>
          </li>
          <li class="lg:w-[15%] w-[100%]">
            <div class="title font-bold text-2xl capitalize mb-4">categories</div>
            <a href="#">banarasi saree</a>
            <a href="#">Chikankari Saree</a>
            <a href="#">Nauvari Saree</a>
            <a href="#">Bomkai Saree</a>
          </li>
        </ul>
      </div> -->
    </div>
    <div class="py-4 bg-gray-300 mt-4">
      <div class="container flex fwrap justify-center gap-5">
        <p class="lg:w-[fit-content] w-[100%]">Copyright © 2024 Fashtsaly All Right Reserved</p>
        <div class="links flex gap-2"><a href="#">privacy policy</a> || <a href="#">Terms and Condition</a> </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.AppFooter {
  background: var(--gray);
  color: var(--black);
  .container{max-width: 1124px;}

  a {
    color: var(--black);
    display: block;
    margin-bottom: 8px;
    text-transform: capitalize;

    &:hover {
      color: var(--primary)
    }
  }
}
</style>
