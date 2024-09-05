<script setup>
import { load } from "@cashfreepayments/cashfree-js";
import { useToast } from "primevue/usetoast";

const plansData = ref([]);
const message = ref("");
const isLoading = ref(true);
const disabled = ref(false);
const visible = ref(false);

const selectedPlan = ref({
  plan_name: "",
  order_id_selectd: "",
});

const formData = ref({
  customerName: "",
  brandName: "",
  customerRole: ["Reseller ", "Wholesaler", "Influencer"],
  selectedRole: "",
  address: "",
  whatsappNum: "",
  socLink: "",
  gstNo: "",
  coupenCode: "",
});

const errors = ref({
  customerName: "",
  brandName: "",
  selectedRole: "",
  address: "",
  whatsappNum: "",
  socLink: "",
  gstNo: "",
});

const toast = useToast();

const show = (message) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

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

const ChoosePlan = (plan_name, order_id) => {
  selectedPlan.value.plan_name = plan_name;
  selectedPlan.value.order_id_selectd = order_id;
  visible.value = true;
  console.log(selectedPlan);
};

const validateForm = () => {
  let isValid = true;
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = "";
  });
  if (!formData.value.customerName.trim()) {
    errors.value.customerName = "Customer Name is required.";
    isValid = false;
  }

  if (!formData.value.brandName.trim()) {
    errors.value.brandName = "Brand Name is required.";
    isValid = false;
  }

  if (!formData.value.selectedRole.length) {
    errors.value.selectedRole = "Role is required.";
    isValid = false;
  }
  if (!formData.value.address.trim()) {
    errors.value.address = "Address is required.";
    isValid = false;
  }

  if (!/^\d{10}$/.test(formData.value.whatsappNum)) {
    errors.value.whatsappNum = "Whatsapp Number must be 10 digits.";
    isValid = false;
  }
  if (formData.value.socLink && !/^https?:\/\/.+/.test(formData.value.socLink)) {
    errors.value.socLink = "Social media account link must be a valid URL.";
    isValid = false;
  }

  if (formData.value.gstNo && !/^[A-Z0-9]{15}$/.test(formData.value.gstNo)) {
    errors.value.gstNo = "GST Number must be 15 characters long.";
    isValid = false;
  }
  return isValid;
};

const order_id = ref(0);

const proceedPayment = async (planid) => {
  // console.log(selectedPlan.value.order_id_selectd);
  if (!validateForm()) {
    return;
  }

  if (!selectedPlan.value.order_id_selectd) {
    show("we are facing network isuue Please Try Again");
    return;
  }
  if (!selectedPlan.value.plan_name) {
    show("No plan selected.");
    return;
  }

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
        plan: selectedPlan.value.order_id_selectd,
        selectedPlan: selectedPlan.value.plan_name,
        customerName: formData.value.customerName,
        brandName: formData.value.brandName,
        selectedRole: formData.value.selectedRole,
        address: formData.value.address,
        whatsappNum: formData.value.whatsappNum,
        socLink: formData.value.socLink,
        gstNo: formData.value.gstNo,
        // coupenCode: formData.value.,
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
        components: {
          order: {
            upi: true,        // Enable UPI
            card: true,       // Enable Card
            netbanking: true, // Enable Netbanking
          },
        },
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
  <Toast />
  <div class="cardsAni flex gap-2 justify-center" v-if="isLoading">
    <ShimmereCard />
    <ShimmereCard />
  </div>
  <div class="subsPlansMain lg:py-8 py-3 bg-gray-100" v-else>
    <div class="container PlansflexingDiv flex justify-center items-start">
      <div class="offers lg:w-[300px] md:w-[300px] w-[100%]">
        <h3 class="text-dark py-3 text-xl">Free</h3>
        <div class="price lg:text-5xl text-3xl py-3 bg-gray-100">₹ 0.00</div>
        <div class="bg-gray-200">
          <button class="rounded-xl" @click="navigateTo('/')">Continue</button>
        </div>
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
      </div>
      <div
        :class="`offers lg:w-[300px] md:w-[300px] w-[100%] relative ${
          index === 1 ? 'mt-[-46px]' : ''
        }`"
        v-for="(pricing, index) in plansData"
        :key="pricing.id"
      >
        <p
          :class="`spclTag text-xl w-fit m-auto rounded-full bg-gray-300 text-dark top-[-15px] px-3 ${
            index === 1 ? 'py-1 mt-3' : ''
          }`"
        >
          {{ index === 1 ? "most popular" : "" }}
        </p>

        <h3 class="text-dark py-3 text-xl">{{ pricing.title }}</h3>
        <div class="price lg:text-5xl text-3xl py-3 bg-gray-100">
          ₹ {{ pricing.price }}
        </div>
        <div class="bg-gray-200">
          <button @click="ChoosePlan(pricing.title, pricing.id)" class="rounded-xl">
            Choose plan
          </button>
          <!-- <button
            :disabled="disabled"
            @click="proceedPayment(pricing.id)"
            class="rounded-xl"
          >Subscribe</button> -->
        </div>
        <ul v-html="pricing.description"></ul>
      </div>
    </div>
  </div>

  <div class="userDetailsForm bg-orange-50">
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      :style="{ width: '450px' }"
      :breakpoints="{ '450px': '450px', '450px': '450px' }"
    >
      <div class="innerdiv lg:p-5 p-2">
        <h3 class="text-xl mb-3 text-center capitalize">quickly provide your details</h3>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <input
            type="text"
            placeholder="Your Name*"
            class="w-full py-2 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
            v-model="formData.customerName"
          />
          <p v-if="errors.customerName" class="text-orange-600 text-sm">
            {{ errors.customerName }}
          </p>
        </div>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <input
            type="text"
            placeholder="Your Brnad Name*"
            class="w-full py-2 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
            v-model="formData.brandName"
          />
          <p v-if="errors.brandName" class="text-orange-600 text-sm">
            {{ errors.brandName }}
          </p>
        </div>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <select
            class="w-full py-2 px-3 text-[15px] border rounded text-gray-700 uppercase cursor-pointer border-gray-400"
            v-model="formData.selectedRole"
          >
            <option value="">Select Role*</option>
            <option v-for="c_role in formData.customerRole" :key="c_role" :value="c_role">
              {{ c_role }}
            </option>
          </select>
          <p v-if="errors.selectedRole" class="text-orange-600 text-sm">
            {{ errors.selectedRole }}
          </p>
        </div>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <input
            type="text"
            placeholder="Your Address*"
            class="w-full py-2 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
            v-model="formData.address"
          />
          <p v-if="errors.address" class="text-orange-600 text-sm">
            {{ errors.address }}
          </p>
        </div>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <input
            type="text"
            placeholder="Your Whatsapp No. For Updates*"
            class="w-full py-2 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
            v-model="formData.whatsappNum"
          />
          <p v-if="errors.whatsappNum" class="text-orange-600 text-sm">
            {{ errors.whatsappNum }}
          </p>
        </div>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <input
            type="text"
            placeholder="Social media account link"
            class="w-full py-2 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
            v-model="formData.socLink"
          />
          <p v-if="errors.socLink" class="text-orange-600 text-sm">
            {{ errors.socLink }}
          </p>
        </div>
        <div class="in_box w-[100%] relative lg:mb-3 mb-2">
          <input
            type="text"
            placeholder="GST NO."
            class="w-full py-2 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
            v-model="formData.gstNo"
          />
          <p v-if="errors.gstNo" class="text-orange-600 text-sm">
            {{ errors.gstNo }}
          </p>
        </div>
        <div class="flexButtons flex justify-end gap-4 mt-3">
          <button
            class="bgblue80 text-white py-2 px-3 rounded-full block min-w-[120px]"
            @click="visible = false"
          >
            Cancel
          </button>
          <button
            class="bgorange text-white py-2 px-3 rounded-full block min-w-[120px]"
            @click="proceedPayment"
            :disabled="disabled"
          >
            <!-- @click="validateForm" -->
            Make Payment
          </button>
        </div>
      </div>
    </Dialog>
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
    /*margin: 10px;*/
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
    background: var(--text-blue);
    color: #fff;
    margin: 10px auto 10px auto;
    padding: 2% 8%;
    border: 0;
    transition-duration: 0.5s;
  }

  button:hover {
    background: var(--primary);
  }
}

@media (max-width: 992px) {
  .PlansflexingDiv {
    justify-content: start !important;
    align-items: center;
    overflow-x: scroll;
    gap:0 8px;
  }
  .PlansflexingDiv .offers {
    min-width: 38%;
  }
}
@media (max-width: 767px) {
  .PlansflexingDiv .offers {
    min-width: 80%;
  }
}
</style>
