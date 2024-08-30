<script setup>
import { load } from "@cashfreepayments/cashfree-js";
const plansData = ref([]);
const message = ref("");
const isLoading = ref(true);
const disabled = ref(false);
const getPlanData = async () => {
  try {
    const response = await fetch(
      "https://fashtsaly.com/API/public/api/getSubscriptionPlans",
      {
        method: "GET",
      }
    );
    const jsonResponse = await response.json();
    plansData.value = jsonResponse.data;
    isLoading.value = false;
  } catch (error) {
    message.value = "Right now we don't have any subscription plans.";
  }
};

onMounted(() => {
  getPlanData();
});
const order_id = ref(0);
const proceedPayment = async (planid) => {
  disabled.value = true;
  const config = useRuntimeConfig();
  const url = `${
    config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
  }api/initiate-payment`;

  try {
    const data = await fetchFromSanctum({
      url: url,
      method: "POST",
      body: {
        plan: planid,
      },
    });
    if (data.cf_order_id) {
      order_id.value = data.id;
      const cashfree = await load({
        mode: "production", //or production
      });

      let checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      };
      const result = await cashfree.checkout(checkoutOptions);
      if (result.error) {
        alert(result.error.message);
        disabled.value = false;
      }
      if (result.redirect) {
        alert("Please try some diffrent browser");
        disabled.value = false;
      }
      if (result.paymentDetails) {
        disabled.value = false;
        getPaymentData();
      }
    } else {
      disabled.value = false;
      alert("Failed to initiate payment.");
    }
  } catch (error) {
    disabled.value = false;
    console.error("Error initiating payment:", error);
  }
};
const getPaymentData = async () => {
  disabled.value = true;
  const config = useRuntimeConfig();
  const url = `${
    config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
  }api/paymentFetch`;
  const data = await fetchFromSanctum({
    url: url,
    method: "POST",
    body: {
      order_id: order_id.value,
    },
  });
  disabled.value = false;
  if (data.res) {
    alert("Payment Successfull");
    navigateTo("/");
  } else {
    alert(data.msg);
  }
};
</script>

<template>
  <div class="cardsAni flex gap-2 justify-center" v-if="isLoading">
    <ShimmereCard />
    <ShimmereCard />
  </div>
  <div class="subsPlansMain py-5 bg-gray-100" v-else>
    <div class="container flex justify-center flex-wrap items-start">
      <div class="offers lg:w-[300px] md:w-[300px] w-[100%]">
        <h3 class="bgblue80 text-white py-3 lg:text-3xl text-3xl">Free</h3>
        <div class="price lg:text-5xl text-3xl py-3 bg-gray-100">₹ 0.00</div>
        <ul>
          <li class="py-2 text-[15px] border-b border-gray-300 bg-gray-50 capitalize">
            Search By Image
          </li>
          <li class="py-2 text-[15px] border-b border-gray-300 bg-gray-50 capitalize">
            5 Searches
          </li>
          <li class="py-2 text-[15px] border-b border-gray-300 bg-gray-50 capitalize">
            Easy download
          </li>
          <li class="py-2 text-[15px] border-b border-gray-300 bg-gray-50 capitalize">
            manufacturer details
          </li>
          <li class="py-2 text-[15px] border-b border-gray-300 bg-gray-50 capitalize">
            wholesale price
          </li>
        </ul>
        <button class="rounded" @click="navigateTo('/')">Continue</button>
      </div>    
      <div class="offers lg:w-[300px] md:w-[300px] w-[100%]" v-for="pricing in plansData" :key="pricing.id">
        <h3 class="bgblue80 text-white py-3 lg:text-3xl text-3xl">{{ pricing.title }}</h3>
        <div class="price lg:text-5xl text-3xl py-3 bg-gray-100">₹ {{ pricing.price }}</div>
        <!-- <small>Annually</small> -->
        <!-- <p>{{ pricing.description }}</p> -->
        <ul v-html="pricing.description">
        </ul>
        <button :disabled="disabled" @click="proceedPayment(pricing.id)" class="rounded">
          Subscribe
        </button>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.subsPlansMain {
  .container {
    z-index: 1;
  }

  .offers {
    position: relative;
    text-align: center;
    background: #fff;
    margin: 10px;
    height: auto;
    top: 0;
    border: 1px solid #eaeaea;
    z-index: 1;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }

  .offers:hover {
    position: relative;
    top: -10px;
  }

  /*.offers:nth-child(even) {
    border: 2px solid var(--primary);
    box-shadow: 0 0 10px 0px #0000001c;
  } 
   .offers:nth-child(even) {
    transform:scale(1.04)
  }
  */

  button {
    font-size: 18px;
    font-weight: 500;
    background: var(--primary);
    color: #fff;
    margin: 10px auto 10px auto;
    padding: 3% 8%;
    border: 0;
    transition-duration: 0.5s;
  }

  button:hover {
    background: var(--text-blue);
  }
}
</style>
