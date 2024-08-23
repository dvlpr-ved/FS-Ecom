<script setup></script>

<template>
  <div class="orderConfirmed bg-gray-200 py-5">
    <div class="orderConfirmed_inner bg-gray-300 m-auto">
      <h1 class="text-3xl text-center p-5 uppercase font-bold text-blue-800">
        fashtsaly
      </h1>
      <div class="or_header p-5 text-center" style="">
        <h2 class="text-2xl capitalize text-center mb-2">
          (Name), Thank You For your order
        </h2>
        <p class="">
          we have received your order and will contact you soon as soon as package is
          shipped. you can find your purchase information below.
        </p>
      </div>
      <!-- loop this card if have >1 orders -->
      <div class="or_summary flex justify-between p-5">
        <div class="imgSide">
          <img src="https://fashtsaly.com/API/public/uploads/bandhej.jpeg" />
        </div>
        <div class="or_detail px-4 border border-gray-500">
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Name :</p>
            <p class="text-right">
              Kashmiri Weaving Pure Zari Saree in Multiple Light Shade Colors
            </p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Price :</p>
            <p class="text-right text-blue-900 font-bold">₹ 500</p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Discount :</p>
            <p class="text-right text-blue-900 font-bold">₹ 200</p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Product Id :</p>
            <p class="text-right text-blue-900 font-bold">#12315</p>
          </div>
          <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
            <p class="w-1/3 font-bold">Size :</p>
            <p class="text-right text-blue-900 font-bold">40</p>
          </div>
          <div class="flex gap-4 justify-between py-2">
            <p class="w-1/3 font-bold">Quantity :</p>
            <p class="text-right text-blue-900 font-bold">01</p>
          </div>
        </div>
      </div>
      <div class="or_totla p-5">
        <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
          <p class="w-1/3 font-bold">Subtotal Price :</p>
          <p class="text-right text-blue-900 font-bold">₹ 500</p>
        </div>
        <div class="flex gap-4 justify-between py-2 border-b border-gray-400">
          <p class="w-1/3 font-bold">Discount :</p>
          <p class="text-right text-blue-900 font-bold">₹ 500</p>
        </div>
      </div>
      <div class="or_downloadbtn flex justify-center pb-5">
        <button class="bgorange py-2 px-5 text-xl">Download Pdf</button>
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
