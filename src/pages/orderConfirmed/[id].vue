<script setup>
const route = useRoute();
const id = route.params.id;
const order= ref(null);
const details = ref(null);
const user = ref(null);
const config = useRuntimeConfig();
  const url = `${
    config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
  }api/getOrderDetails`;
const getData =async () => {
  const data = await fetchFromSanctum({
    url: url,
    method: "POST",
    body: { order_id: route.params.id },
  }); 
  order.value = data.order;
  details.value =  data.details;
  user.value = data.user;
}
onMounted(() => {
  getData();
});

</script>

<template>
  <div class="orderConfirmed bg-gray-200 py-5">
    <div v-if="order" class="orderConfirmed_inner bg-gray-300 m-auto">
      <h1 class="text-3xl text-center p-5 uppercase font-bold text-blue-800">
        fashtsaly
      </h1>
      <div class="or_header p-5 text-center" style="">
        <h2 class="text-2xl capitalize text-center mb-2">
          {{ user.name }}, Thank You For your order
        </h2>
        <p class="">
          we have received your order and will contact you soon as soon as package is
          shipped. you can find your purchase information below.
        </p>
      </div>
      <!-- loop this card if have >1 orders -->
      <div  v-for="detail in details" class="or_summary flex justify-between p-5">
        <div class="imgSide">
          <img src="https://fashtsaly.com/API/public/uploads/bandhej.jpeg" />
        </div>
        <div class="or_detail px-4 border border-gray-500">
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Name :</p>
            <p class="text-right">
              {{detail.name}}
            </p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Price :</p>
            <p class="text-right text-blue-900 font-bold">₹ {{ detail.price_per_pc }}</p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Discount :</p>
            <p class="text-right text-blue-900 font-bold">₹ 0</p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Product Id :</p>
            <p class="text-right text-blue-900 font-bold">#{{ detail.product_id }}</p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Size :</p>
            <p class="text-right text-blue-900 font-bold">{{detail.size}}</p>
          </div>
          <div class="flex gap-4 justify-between py-2">
            <p class="w-1/3 font-bold">Quantity :</p>
            <p class="text-right text-blue-900 font-bold">{{ detail.quantity }}</p>
          </div>
        </div>
      </div>
      <div class="or_totla p-5">
        <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
          <p class="w-1/3 font-bold">Subtotal Price :</p>
          <p class="text-right text-blue-900 font-bold">₹ {{ order.subtotal }}</p>
        </div>
        <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
          <p class="w-1/3 font-bold">Discount :</p>
          <p class="text-right text-blue-900 font-bold">₹ 0</p>
        </div>
      </div>
      <div class="or_downloadbtn flex justify-center pb-5">
        <a :href="order.pdf" target="_blank">
        <button class="bgorange py-2 px-5 text-xl">Download Pdf</button>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.orderConfirmed {
}
.orderConfirmed_inner {
  min-width: 670px;
  max-width: 670px;
  width: 100%;

  .imgSide {
    width: 30%;
  }
  .or_detail {
    width: 68%;
    background: #ffffff80;
  }
}
.or_header {
  background: #1e40af29;
}
</style>
