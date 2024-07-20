<script lang="ts" setup>
const route = useRoute();
const isSelectedRoute = ref(false);

onMounted(() => {
  isSelectedRoute.value = route.path === "/myaccounts";
});

console.log('route here ...',route.path);

function checkSelectedRoute() {}
</script>

<template>
  <footer
    class="AppFooter lg:bg-blue-800 lg:text-white text-black lg:block md:hidden"
    :class="{ hidden: !isSelectedRoute }"
  >
    <div class="container">
      <div class="footerFlex">
        <ul class="flex justify-between fwrap lg:pl-5 pl-0">
          <li
            class="lg:w-[20%] w-[50%] footerLi lg:py-5 px-3 py-3 lg:mb-0 mb-3 lg:border-0 border-b"
          >
            <div class="title font-bold text-2xl capitalize mb-2">information</div>
            <nuxt-link to="../about">About Us</nuxt-link>
            <nuxt-link to="../contactus">Contact Us</nuxt-link>
            <nuxt-link to="../privacypolicy">Privacy Policy</nuxt-link>
            <nuxt-link to="../legalpolicy">Legal & Policies</nuxt-link>
            <nuxt-link to="../shippingPolicy">shipping policy</nuxt-link>
          </li>
          <li
            class="lg:w-[20%] w-[50%] footerLi lg:py-5 px-3 py-3 lg:mb-0 mb-3 lg:border-0 border-b"
          >
            <div class="title font-bold text-2xl capitalize mb-2">Help</div>
            <nuxt-link to="../payment">Payment</nuxt-link>
            <nuxt-link to="../cancellation">Cancellation & Return</nuxt-link>
            <nuxt-link to="../faq">FAQ</nuxt-link>
            <nuxt-link to="#">Sitemap</nuxt-link>
          </li>
          <li class="lg:w-[20%] w-[100%] footerLi lg:py-5 px-3 py-3 lg:border-0 border-b">
            <div class="title font-bold text-2xl capitalize mb-2">Reach Out to Us</div>
            <div class="flex socLinks gap-3 mb-3">
              <nuxt-link to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-instagram lg:text-3xl text-2xl bg-black p-2 rounded-full"
                ></i>
              </nuxt-link>
              <nuxt-link to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-facebook lg:text-3xl text-2xl bg-blue-800 p-2 rounded-full"
                ></i>
              </nuxt-link>
              <nuxt-link to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-whatsapp lg:text-3xl text-2xl bg-green-600 p-2 rounded-full"
                ></i>
              </nuxt-link>
              <nuxt-link to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-youtube lg:text-3xl text-2xl bg-[#b91c1c] p-2 rounded-full"
                ></i>
              </nuxt-link>
            </div>
            <ul>
              <li class="footerLi">
                <div class="title font-bold text-2xl capitalize mb-2">Our Servies</div>
                <nuxt-link to="#">Subscription Plans</nuxt-link>
                <nuxt-link to="#">Our Servies</nuxt-link>
                <nuxt-link to="#">Advertise</nuxt-link>
              </li>
            </ul>
          </li>
          <li
            class="lg:w-[36%] w-[100%] footerLi flex place-items-center place-content-center text-center lg:p-0 p-3"
            style="background: var(--primary)"
          >
            <div class="wrapper">
              <div class="title font-bold text-2xl capitalize mb-2">
                Join with us as a Reseller & Wholesaler
              </div>
              <nuxt-link
                to="#"
                class="py-3 px-5 sbusbtn text-xl bgblue80 w-fit m-auto rounded"
                >Subscribe now
              </nuxt-link>
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
@media (max-width: 768px) {
  .AppFooter {
    a {
      color: #000000;
    }
    .sbusbtn {
      color: #ffffff;
    }
  }
  .footerLi {
    background: #eeeeee8a;
  }
  .socLinks {
    .primeIcons {
      color: #fff;
    }
  }
}
</style>
