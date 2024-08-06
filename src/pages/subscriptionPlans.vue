<script setup>
const plansData = ref([]);
const message = ref("");
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
  } catch (error) {
    message.value = "Right now we don't have any subscription plans.";
  }
};

onMounted(() => {
  getPlanData();
});
</script>

<template>
  <div class="subsPlansMain py-3 bg-gray-100">
    <div class="container flex justify-center items-center">
      <div class="offers" v-for="pricing in plansData" :key="pricing.id">
        <h2 class="text-2xl mb-3">{{ pricing.title }}</h2>
        <h3 class="price text-3xl">₹ {{ pricing.price }}</h3>
        <small>Annually</small>
        <p>{{ pricing.description }}</p>
        <button class="rounded">Subscribe</button>
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
