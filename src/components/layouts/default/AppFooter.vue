<script lang="ts" setup>
const route = useRoute();
const isSelectedRoute = ref(false);

const checkRoute = () => {
  isSelectedRoute.value = route.path.toLowerCase().includes('myaccounts');
};

watch(route, checkRoute, { immediate: true });

</script>

<template>
  <footer
    class="AppFooter lg:bg-blue-800 lg:text-white text-black lg:block md:hidden"
    :class="{ hidden: isSelectedRoute }"
  >
    <div class="container">
      <div class="footerFlex">
        <ul class="flex justify-between fwrap lg:pl-5 pl-0">
          <li
            class="lg:w-[20%] w-[50%] footerLi lg:py-5 px-3 py-3 lg:mb-0 mb-3 lg:border-0 border-b"
          >
            <div class="title font-bold text-2xl capitalize mb-2">information</div>
            <NuxtLink to="/about">About Us</NuxtLink>
            <NuxtLink to="/contactus">Contact Us</NuxtLink>
            <NuxtLink to="/">Privacy Policy</NuxtLink>
            <NuxtLink to="/">Legal & Policies</NuxtLink>
            <NuxtLink to="/">shipping policy</NuxtLink>
          </li>
          <li
            class="lg:w-[20%] w-[50%] footerLi lg:py-5 px-3 py-3 lg:mb-0 mb-3 lg:border-0 border-b"
          >
            <div class="title font-bold text-2xl capitalize mb-2">Help</div>
            <NuxtLink to="../payment">Payment</NuxtLink>
            <NuxtLink to="../cancellation">Cancellation & Return</NuxtLink>
            <NuxtLink to="../faq">FAQ</NuxtLink>
            <NuxtLink to="#">Sitemap</NuxtLink>
          </li>
          <li class="lg:w-[20%] w-[100%] footerLi lg:py-5 px-3 py-3 lg:border-0 border-b">
            <div class="title font-bold text-2xl capitalize mb-2">Reach Out to Us</div>
            <div class="flex socLinks gap-3 mb-3">
              <NuxtLink to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-instagram lg:text-3xl text-2xl bg-black p-2 rounded-full"
                ></i>
              </NuxtLink>
              <NuxtLink to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-facebook lg:text-3xl text-2xl bg-blue-800 p-2 rounded-full"
                ></i>
              </NuxtLink>
              <NuxtLink to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-whatsapp lg:text-3xl text-2xl bg-green-600 p-2 rounded-full"
                ></i>
              </NuxtLink>
              <NuxtLink to="#" class="hover:text-blue-100">
                <i
                  class="pi primeIcons pi-youtube lg:text-3xl text-2xl bg-[#b91c1c] p-2 rounded-full"
                ></i>
              </NuxtLink>
            </div>
            <ul>
              <li class="footerLi">
                <div class="title font-bold text-2xl capitalize mb-2">Our Servies</div>
                <NuxtLink to="../subscriptionplans">Subscription Plans</NuxtLink>
                <NuxtLink to="#">Our Servies</NuxtLink>
                <NuxtLink to="#">Advertise</NuxtLink>
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
              <NuxtLink
                to="#"
                class="py-3 px-5 sbusbtn text-xl bgblue80 w-fit m-auto rounded"
                >Subscribe now
              </NuxtLink>
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
