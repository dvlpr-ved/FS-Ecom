<script lang="ts">

</script>

<template>
  <footer class="AppFooter bg-blue-800 text-white lg:block hidden">
    <div class="container">
      <div class="footerFlex">
        <ul class="flex justify-between fwrap pl-5">
          
          <li class="w-[20%] py-5">
            <div class="title font-bold text-2xl capitalize mb-4">information</div>
            <a href="../about">about us</a>
            <a href="../contactus">Contact us</a>
            <a href="#">privacy policy</a>
            <a href="#">return policy</a>
            <a href="#">shipping policy</a>
          </li>
          <li class="w-[20%] py-5">
            <div class="title font-bold text-2xl capitalize mb-4">Help</div>
            <a href="../orders">my order</a>
            <a href="../whitelist">my Whitelist</a>
            <a href="#">account details</a>
            <a href="#">shipping policy</a>
          </li>
          <li class="w-[20%] py-5">
            <div class="title font-bold text-2xl capitalize mb-4">Reach Out to Us</div>
            <a href="#">banarasi saree</a>
            <a href="#">Chikankari Saree</a>
            <a href="#">Nauvari Saree</a>
            <a href="#">Bomkai Saree</a>
            <ul>
              <li class="">
                <div class="title font-bold text-2xl capitalize">Our Servies</div>
                <a href="#">banarasi saree</a>
              </li>
            </ul>
          </li>
          <li class="lg:w-[36%] w-[100%] flex place-items-center place-content-center text-center" style="background:var(--primary)">
            <div class="wrapper">
              <div class="title font-bold text-2xl capitalize mb-4">Join with us as a Reseller & Wholesaler</div>
              <a href="#"
                      class="commonbtn py-3 px-5 text-xl bg-blue-800 w-fit m-auto"
                  >Subscribe now</a>
            </div>
          </li>
        </ul>
      </div> 
    </div>
    <div class="py-4 bg-blue-900">
      <div class="container flex fwrap justify-center gap-5">
        <p class="lg:w-[fit-content] w-[100%]">Copyright © 2024 Fashtsaly All Right Reserved</p>
        <div class="links flex gap-2"><a href="#">privacy policy</a> || <a href="#">Terms and Condition</a> </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.AppFooter {
  .container{max-width: 100%; padding:0;}

  a {
    color: #ffffff;
    display: block;
    margin-bottom: 8px;
    text-transform: capitalize;

    &:hover {
      color: var(--primary)
    }
  }
}
</style>
