<script lang="ts">

</script>

<template>
  <footer class="AppFooter lg:pt-6 pt-4">
    <div class="container">
      <div class="footerFlex">
        <ul class="flex justify-between fwrap">
          <!-- <li class="lg:w-[36%] w-[100%] lg:mb-0 mb-4">
            <a href="" class="text-5xl mb-4">Logo Here</a>
            <p class="aboutcontent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere voluptas labore
              velit repellat fugiat suscipit maxime expedita rerum adipisci provident doloremque ullam, quis veritatis
              voluptatem soluta eum hic odit temporibus.</p>
          </li> -->
          <li class="lg:w-[16%] w-[48%] lg:mb-0 mb-4">
            <div class="title font-bold text-2xl capitalize mb-4">information</div>
            <a href="../about">about us</a>
            <a href="../contactus">Contact us</a>            
            <a href="../">privacy policy</a>            
            <a href="../blogs">Blogs</a>            
            <!-- <a href="../contactus">Reach Out to Us	</a>  -->
          </li>
          <li class="lg:w-[16%] w-[100%]">
            <div class="title font-bold text-2xl capitalize mb-4">Our Servies	</div>
            <a href="../">Become a Seller</a>
            <a href="../">Advertise</a>
          </li>
          <li class="lg:w-[16%] w-[48%] lg:mb-0 mb-4">
            <div class="title font-bold text-2xl capitalize mb-4">legal policies</div>
            <a href="../">shipping policy</a>
            <a href="../">Subscriber policy</a>
            <a href="../">Cancellation Policy</a>
            <a href="../">return & Exchnage policy</a>
          </li>
          <li class="lg:w-[16%] w-[100%]">
            <div class="title font-bold text-2xl capitalize mb-4">Help	</div>
            <a href="../">Payment</a>
            <a href="../">FAQ</a>
            <a href="../">Sitemap</a>
            <a href="../">Cancellation & Return</a>
          </li>
          <li class="lg:w-[16%] w-[100%]">
            <div class="title font-bold text-2xl capitalize mb-4">Follow Us</div>
            <div class="sharediv flex lg:flex-wrap flex-nowrap gap-2 items-end">
              <a href="JavaScript:void(0)" class="lg:w-[48%] w-[auto]"> <i class="pi pi-instagram text-2xl transition bg-blue-800 border-0"></i> </a>
              <a href="JavaScript:void(0)" class="lg:w-[48%] w-[auto]"> <i class="pi pi-whatsapp text-2xl transition bg-blue-800 border-0"></i> </a>
              <a href="JavaScript:void(0)" class="lg:w-[48%] w-[auto]"> <i class="pi pi-facebook text-2xl transition bg-blue-800 border-0"></i> </a>
              <a href="JavaScript:void(0)" class="lg:w-[48%] w-[auto]"> <i class="pi pi-twitter text-2xl transition bg-blue-800 border-0"></i> </a>
          </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="py-4 bg-gray-300 mt-4">
      <div class="container flex fwrap justify-center gap-5">
        <p class="lg:w-[fit-content] w-[100%]">Copyright © 2023-2024 Fashtsaly All Right Reserved</p>
        <div class="links flex gap-2"><a href="#">privacy policy</a> || <a href="#">Terms and Condition</a> </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container{max-width: 1150px}
.AppFooter {
  background: var(--gray);
  color: var(--black);

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
