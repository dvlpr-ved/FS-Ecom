<script lang="ts"></script>

<template>
  <footer class="AppFooter bgblue80 hideFromHome text-white">
    <div class="container">
      <div class="footerFlex">
        <ul class="flex justify-between fwrap lg:pl-5 pl-0">
          <li
            class="lg:w-[20%] w-[100%] lg:py-5 px-3 py-3 lg:mb-0 mb-3 lg:border-0 border-b"
          >
            <div class="title font-bold text-2xl capitalize mb-4">information</div>
            <a href="../about">About Us</a>
            <a href="../contactus">Contact Us</a>
            <a href="../privacypolicy">Privacy Policy</a>
            <a href="../legalpolicy">Legal & Policies</a>
            <a href="../shippingPolicy">shipping policy</a>
          </li>
          <li
            class="lg:w-[20%] w-[100%] lg:py-5 px-3 py-3 lg:mb-0 mb-3 lg:border-0 border-b"
          >
            <div class="title font-bold text-2xl capitalize mb-4">Help</div>
            <a href="../payment">Payment</a>
            <a href="../cancellation">Cancellation & Return</a>
            <a href="../faq">FAQ</a>
            <a href="#">Sitemap</a>
          </li>
          <li class="lg:w-[20%] w-[100%] lg:py-5 px-3 py-3 lg:border-0 border-b">
            <div class="title font-bold text-2xl capitalize mb-4">Reach Out to Us</div>
            <div class="flex gap-3 mb-3">
              <a href="#" class="hover:text-blue-100">
                <i
                  class="pi pi-instagram lg:text-3xl text-2xl bg-black p-2 rounded-full"
                ></i>
              </a>
              <a href="#" class="hover:text-blue-100">
                <i
                  class="pi pi-facebook lg:text-3xl text-2xl bg-blue-800 p-2 rounded-full"
                ></i>
              </a>
              <a href="#" class="hover:text-blue-100">
                <i
                  class="pi pi-whatsapp lg:text-3xl text-2xl bg-green-600 p-2 rounded-full"
                ></i>
              </a>
              <a href="#" class="hover:text-blue-100">
                <i
                  class="pi pi-youtube lg:text-3xl text-2xl bg-[#b91c1c] p-2 rounded-full"
                ></i>
              </a>
            </div>
            <ul>
              <li class="">
                <div class="title font-bold text-2xl capitalize mb-4">Our Servies</div>
                <a href="#">Our Servies</a>
                <a href="#">Advertise</a>
              </li>
            </ul>
          </li>
          <li
            class="lg:w-[36%] w-[100%] flex place-items-center place-content-center text-center lg:p-0 p-3"
            style="background: var(--primary)"
          >
            <div class="wrapper">
              <div class="title font-bold text-2xl capitalize mb-4">
                Join with us as a Reseller & Wholesaler
              </div>
              <a href="#" class="py-3 px-5 text-xl bgblue80 w-fit m-auto rounded"
                >Subscribe now</a
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.AppFooter {
  .container {
    max-width: 1600px;
    padding: 0;
  }

  a {
    color: #ffffff;
    display: block;
    margin-bottom: 8px;
    text-transform: capitalize;

    &:hover {
      color: var(--primary);
    }
  }
}
</style>
