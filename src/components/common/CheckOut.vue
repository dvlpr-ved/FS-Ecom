<template>
  <section class="chkOutComp bg-gray-200">
    <div class="flex container justify-center flex-wrap py-4">
      <div class="leftside lg:w-[70%] w-[100%]">
        <div class="w-full px-4">
          <div v-if="notItems">
            <p class="text-2xl mb-2">Loading Products</p>
            <div class="w-full py-12 shimmer mb-3"></div>
          </div>
          <div class="flex flex-wrap -mx-4">
            <div
              v-for="product in items"
              :key="product.id"
              class="w-full lg:w-2/3 px-4 mb-4"
            >
              <div class="bg-white rounded-lg shadow-md p-6">
                <div class="flex">
                  <div class="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    <img
                      :src="product.image[0] ? product.image[0].source : 'No Image'"
                      alt="Product Image"
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div class="ml-4">
                    <h2 class="text-lg font-semibold">{{ product.product_name }}</h2>
                    <!-- <p class="text-gray-600">{{ product.description }}</p> -->
                    <div class="flex items-center mt-2">
                      <label class="mr-2">Quantity:</label>
                      <input
                        type="number"
                        class="border border-gray-300 px-3 py-1 rounded-md w-16 text-center"
                        v-model="quantities[product.id]"
                        @input="updateTotalPrice(product)"
                      />
                    </div>
                    <p class="font-semibold mt-2">
                      Total Price: ₹{{ product.totalPrice }}
                    </p>
                    <button
                      @click="removeProduct(product.id)"
                      class="mt-2 text-white px-4 py-1 rounded"
                      style="background: red"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="w-full px-4">
          <div class="addressTopCard bg-white">
            <h1 class="text-2xl font-semibold mb-3 p-2 px-4 bgblue80 text-white">
              Delivery Address
            </h1>
            <div class="flex flex-wrap">
              <template v-if="isLoading">
                <div class="w-full py-12 shimmer"></div>
              </template>
              <div v-for="address in userAddress" class="col-12 p-3 flex gap-3 border-b">
                <input
                  type="radio"
                  class="h-[18px] w-[18px] mt-1"
                  :checked="selectedAddress == address.id ? true : false"
                  @click="handleAddressSelection(address)"
                  :id="address.id"
                />
                <label class="textdiv cursor-pointer capitalize" :for="address.id">
                  <span class="font-bold"
                    >{{ address.name }} Ph : {{ address.phone }}</span
                  >
                  <span class="text-lg block text-gray-700">
                    {{ address.address ? address.address : "" }} ,
                    {{ address.locality ? address.locality : "" }} ,
                    {{ address.landmark ? address.landmark : "" }},
                    {{ address.city ? address.city : "" }} -
                    {{ address.pincode ? address.pincode : "" }} ,
                    {{ address.city ? address.city : "" }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div class="shippingForm bg-white">
            <template v-if="isLoading">
              <div class="py-12 shimmer"></div>
            </template>
            <div v-else>
              <h1 class="text-2xl font-semibold mb-3 p-2 px-4 bgblue80 text-white">
                Shipping Details
              </h1>
              <div class="formdiv flex gap-5 flex-wrap mb-3 p-4">
                <div class="in_box lg:w-[47.5%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Your Name</span
                  >
                  <input
                    type="text"
                    placeholder="Name"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.name"
                  />
                  <p v-if="errors.name" class="text-[red] text-sm">{{ errors.name }}</p>
                </div>
                <div class="in_box lg:w-[47.5%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Your Email</span
                  >
                  <input
                    type="email"
                    placeholder="Email"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.email"
                  />
                  <p v-if="errors.email" class="text-[red] text-sm">{{ errors.email }}</p>
                </div>
                <div class="in_box lg:w-[47.5%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Phone No. Primary</span
                  >
                  <input
                    type="tel"
                    placeholder="Phone No."
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.phone"
                  />
                  <p v-if="errors.phone" class="text-[red] text-sm">{{ errors.phone }}</p>
                </div>
                <div class="in_box lg:w-[47.5%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Area Pincode</span
                  >
                  <input
                    placeholder="Pincode"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.pincode"
                  />
                  <p v-if="errors.pincode" class="text-[red] text-sm">
                    {{ errors.pincode }}
                  </p>
                </div>
                <div class="in_box lg:w-[100%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Your Locality</span
                  >
                  <input
                    placeholder="Locality"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.locality"
                  />
                  <p v-if="errors.locality" class="text-[red] text-sm">
                    {{ errors.locality }}
                  </p>
                </div>
                <div class="in_box w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Your Address</span
                  >
                  <textarea
                    placeholder="Address"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.address"
                  ></textarea>
                  <p v-if="errors.address" class="text-[red] text-sm">
                    {{ errors.address }}
                  </p>
                </div>
                <div class="in_box lg:w-[47.5%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Your City</span
                  >
                  <input
                    placeholder="City"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.city"
                  />
                  <p v-if="errors.city" class="text-[red] text-sm">{{ errors.city }}</p>
                </div>
                <div class="in_box lg:w-[47.5%] w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Your State</span
                  >
                  <select
                    class="w-full py-3 px-3 text-[15px] border rounded text-gray-700 uppercase cursor-pointer border-gray-400"
                    v-model="formData.selectedState"
                  >
                    <option value="">Select State</option>
                    <option v-for="state in formData.states" :key="state" :value="state">
                      {{ state }}
                    </option>
                  </select>
                  <p v-if="errors.selectedState" class="text-[red] text-sm">
                    {{ errors.selectedState }}
                  </p>
                </div>
                <div class="in_box w-[100%] relative">
                  <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
                    >Landmark Optional</span
                  >
                  <input
                    placeholder="Landmark"
                    class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
                    v-model="formData.landmark"
                  />
                </div>
                <!-- <button
                  class="py-2 px-5 rounded text-white text-[18px] bgblue80 w-fit m-auto uppercase"
                >
                  deliver here
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="OrderSummary lg:w-[30%] w-[100%]">
        <div class="bg-white shadow-md">
          <h2 class="text-lg font-semibold mb-4 p-3 bgblue80 text-white text-center">
            Order Summary
          </h2>
          <div class="px-2 py-1 flex justify-between">
            <span class="text-[17px]">Subtotal :</span>
            <span class="text-[17px]">₹{{ subtotal }}</span>
          </div>
          <div class="px-2 py-1 flex justify-between">
            <span class="text-[17px]">Shipping :</span>
            <span class="text-[17px]">₹{{ shipping }}</span>
          </div>
          <hr class="my-2" />
          <div class="px-2 py-1 flex justify-between">
            <span class="font-semibold text-[17px]">Total :</span>
            <span class="font-semibold text-[17px]">₹{{ total }}</span>
          </div>
          <button
            class="mt-4 hover:opacity-90 text-white px-4 py-2 w-full text-2xl"
            style="background: var(--primary)"
            @click="processPayment"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {load} from '@cashfreepayments/cashfree-js';

const quantities = ref({});
const items = ref([]);
const notItems = ref(true);
const totalPrice = ref(0);
const subtotal = ref(0);
const shipping = ref(0);
const total = ref(0);
const selectedAddress = ref(null);

const useGetAddressStore = useAddressStore();
const userAddress = computed(() => useGetAddressStore.userAddress || []);
const isLoading = computed(() => useGetAddressStore.isLoading);

const handleAddressSelection = (address) => {
  selectedAddress.value = address.id;
  formData.value.name = address.name;
  formData.value.email = address.email;
  formData.value.phone = address.phone;
  formData.value.pincode = address.pincode;
  formData.value.locality = address.locality;
  formData.value.address = address.address;
  formData.value.city = address.city;
  formData.value.selectedState = address.state;
  formData.value.landmark = address.landmark;
};

const formData = ref({
  name: "",
  email: "",
  phone: "",
  pincode: "",
  locality: "",
  address: "",
  city: "",
  states: ["Rajasthan", "Delhi", "MP", "UP"],
  selectedState: "",
  landmark: "",
});

const errors = ref({
  name: "",
  email: "",
  phone: "",
  pincode: "",
  locality: "",
  address: "",
  city: "",
  selectedState: "",
});

const removeProduct = (productId) => {
  delete quantities.value[productId];
  items.value = items.value.filter((item) => item.id !== productId);
  updateSubtotal();
};

const updateTotalPrice = (product) => {
  const quantity = quantities.value[product.id];
  product.totalPrice = product.price * quantity;
  updateSubtotal();
};

const updateSubtotal = () => {
  subtotal.value = items.value.reduce((acc, item) => {
    return acc + item.price * (quantities.value[item.id] || 0);
  }, 0);
  total.value = subtotal.value + shipping.value;
};

const getCheckoutProduct = async () => {
  const res = await fetchFromSanctum({
    url: "https://fashtsaly.com/API/public/api/getCheckoutProducts",
    method: "POST",
  });
  if (res.success) {
    items.value = res.data;
    items.value.forEach((item) => {
      quantities.value[item.id] = item.quantity;
      item.totalPrice = item.price * item.quantity;
    });
    updateSubtotal();
    notItems.value = false;
  }
};

onMounted(async () => {
  await getCheckoutProduct();
  useGetAddressStore.fetchUserAddress();
});
const order_id = ref('');
const disabled = ref(false);
const processing = ref(false);
const processPayment =async () => {
  processing.value = true;
  const config = useRuntimeConfig();
  const url = `${
    config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
  }api/initiate-checkout`;

  const response = await fetchFromSanctum({
    url : url,
    method : 'POST',
    body : {
      shippingDetails : formData.value,
      items :items.value ,
      productQuantity : quantities.value,
      selectedAddress : selectedAddress.value
    }
  });
  if(response.success){
    const data = response.data;
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
  }
  else if(response.msg){
    alert(response.msg);
  }
  else{
    alert('Failed to initiate checkout');
  }
}
const getPaymentData =async () => {
  disabled.value = true;
  const config = useRuntimeConfig();
  const url = `${
    config.API_BASE_URL ? config.API_BASE_URL : "https://fashtsaly.com/API/public/"
  }api/paymentFetchCheckout`;
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
    navigateTo(`/orderConfirmed/${order_id.value}`);
  }
  else{
    alert(data.msg);
  }  
}
</script>

<style scoped>
.chkOutComp {
  .container {
    max-width: 1100px;
  }
}
</style>
