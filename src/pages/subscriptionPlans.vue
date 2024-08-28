<script setup>
import {load} from '@cashfreepayments/cashfree-js';
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
      method: 'POST',
      body : {
        plan : planid
      }
    });
    if (data.cf_order_id) {
      order_id.value = data.id;
      const cashfree = await load({
        mode: "production" //or production
      });

      let checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal"
      };
      const result =await cashfree.checkout(checkoutOptions);
        if(result.error){
          alert(result.error.message)
          disabled.value = false;
        }
        if(result.redirect){
          alert("Please try some diffrent browser");
          disabled.value = false;
        }
        if(result.paymentDetails){
          disabled.value = false;
          getPaymentData();
        }
    } else {
      disabled.value = false;
      alert('Failed to initiate payment.');
    }
  } catch (error) {
    disabled.value = false;
    console.error('Error initiating payment:', error);
  }
};
const getPaymentData = async () => {
  disabled.value = true;
    const config = useRuntimeConfig();
  const url = `${
    config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
  }api/paymentFetch`;
  const data = await fetchFromSanctum({
    url : url,
    method : 'POST',
    body : {
      order_id : order_id.value
    }
  });
  disabled.value = false;
  if(data.res){
    alert('Payment Successfull');
    navigateTo('/');
  }
  else{
    alert(data.msg);
  }
}
</script>

<template>
  <div class="cardsAni flex gap-2 justify-center" v-if="isLoading">
    <ShimmereCard />
    <ShimmereCard />
  </div>
  <div class="subsPlansMain py-3 bg-gray-100" v-else>
    <div class="container flex justify-center items-center">
      <div class="offers" v-for="pricing in plansData" :key="pricing.id">
        <h2 class="text-2xl mb-3">{{ pricing.title }}</h2>
        <h3 class="price text-3xl">₹ {{ pricing.price }}</h3>
        <small>Annually</small>
        <p>{{ pricing.description }}</p>
        <button :disabled="disabled" @click="proceedPayment(pricing.id)" class="rounded">Subscribe</button>
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
    padding: 1%;
    margin: 10px;
    width: 300px;
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
    top: -20px;
  }

  .offers:nth-child(2) {
    border-top: 2px solid var(--text-blue);
    box-shadow: 0 0 10px 0px #0000001c;
  }

  .offers:nth-child(2) h3 {
    margin-top: 20px;
  }

  button {
    font-size: 18px;
    font-weight: 500;
    background: var(--primary);
    color: #fff;
    margin: 30px auto 20px auto;
    padding: 4% 8%;
    border: 0;
    transition-duration: 0.5s;
  }

  button:hover {
    background: var(--text-blue);
  }
}
</style>