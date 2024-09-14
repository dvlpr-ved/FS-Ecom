<script setup>
import { useToast } from "primevue/usetoast";

const is_submitting = ref(false);
const visible = ref(false);
const authStore = useAuthStore();
const toast = useToast();
const show = (message, DieLife = 4000) => {
  toast.add({ severity: "success", detail: message, life: DieLife });
};

const formData = ref({
  name: "",
  email: "",
  phone: "",
  social_media: "",
  gst_no: "",
  pincode: "",
  locality: "",
  city: "",
  state: ["Rajasthan", "Mp", "Up"],
  selectedState: "",
  landmark: "",
});
const errors = ref({
  name: "",
  email: "",
  phone: "",
  social_media: "",
  pincode: "",
  locality: "",
  city: "",
  selectedState: "",
  landmark: "",
});

const closeModal = () => {
  visible.value = false;
};

const validateForm = () => {
  let isValid = true;
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = "";
  });
  if (!formData.value.name.trim()) {
    errors.value.name = "Name is required.";
    isValid = false;
  }

  if (!formData.value.email.trim()) {
    errors.value.email = "Email is required.";
    isValid = false;
  }

  if (!/^\d{10}$/.test(formData.value.phone)) {
    errors.value.phone = "Whatsapp Number must be 10 digits.";
    isValid = false;
  }
  if (!/^\d{6}$/.test(formData.value.pincode)) {
    errors.value.pincode = "pin code must be 6 digits.";
    isValid = false;
  }
  if (!formData.value.locality.trim()) {
    errors.value.locality = "Address is required.";
    isValid = false;
  }
  if (!formData.value.city.trim()) {
    errors.value.city = "City is required.";
    isValid = false;
  }
  if (!formData.value.landmark.trim()) {
    errors.value.landmark = "Landmark is required.";
    isValid = false;
  }

  if (
    !formData.value.social_media &&
    !/^https?:\/\/.+/.test(formData.value.social_media)
  ) {
    errors.value.social_media = "Social media account link must be a valid URL.";
    isValid = false;
  }

  if (formData.value.gst_no && !/^[A-Z0-9]{15}$/.test(formData.value.gst_no)) {
    errors.value.gst_no = "GST Number must be 15 characters long.";
    isValid = false;
  }

  if (!formData.value.selectedState.trim()) {
    errors.value.selectedState = "State is required.";
    isValid = false;
  }
  return isValid;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!authStore.isUserLoggedin) {
    visible.value = true;
    return;
  }
  if (!validateForm()) {
    return;
  }
  console.log("formData 1", formData);
  is_submitting.value = true;

  const url = "https://fashtsaly.com/API/public/api/RegisterSeller";
  try {
    const res = await fetchFromSanctum({
      url: url,
      method: "POST",
      body: {
        name: formData.value.name,
        email: formData.value.email,
        phone: formData.value.phone,
        social_media: formData.value.social_media,
        gst_no: formData.value.gst_no,
        pincode: formData.value.pincode,
        locality: formData.value.locality,
        city: formData.value.city,
        state: formData.value.selectedState,
        landmark: formData.value.landmark,
      },
    });
    if (res.success === true) {
      console.log("Registration Successfully");
      show("Registration Successfully");
    } else {
      console.error("Registration failed:", res);
      show("Registration failed. Please try again.");
    }
    setTimeout(() => {
      navigateTo("/");
    }, 2000);
    is_submitting.value = false;
  } catch (error) {
    console.error("Error in Submitting:", error);
  } finally {
    is_submitting.value = false;
  }
};
</script>

<template>
  <Toast />
  <section class="becomeAsellerSection afterBefore lg:py-8">
    <div class="wrapper relative z-1 max-w-[900px] m-auto">
      <div class="flexdiv flex justify-end">
        <div class="flexdiv bg-white lg:w-1/2 w-[100%]">
          <h2 class="lg:text-2xl text-xl lg:p-4 p-1 bgblue80 text-white text-center">Fill Out Now</h2>
          <form>
            <!-- @submit="handleSubmit" -->
            <div class="inbox">
              <input
                placeholder="Name*"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.name"
              />
              <p v-if="errors.name" class="pl-3 text-orange-600 text-sm">
                {{ errors.name }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="Email*"
                type="email"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.email"
              />
              <p v-if="errors.email" class="pl-3 text-orange-600 text-sm">
                {{ errors.email }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="Phone*"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.phone"
              />
              <p v-if="errors.phone" class="pl-3 text-orange-600 text-sm">
                {{ errors.phone }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="social Link"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.social_media"
              />
              <p v-if="errors.social_media" class="pl-3 text-orange-600 text-sm">
                {{ errors.social_media }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="GST No."
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.gst_no"
              />
              <p v-if="errors.gst_no" class="pl-3 text-orange-600 text-sm">
                {{ errors.gst_no }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="city"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.city"
              />
              <p v-if="errors.city" class="pl-3 text-orange-600 text-sm">
                {{ errors.city }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="Pincode"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.pincode"
              />
              <p v-if="errors.pincode" class="pl-3 text-orange-600 text-sm">
                {{ errors.pincode }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="Locality*"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.locality"
              />
              <p v-if="errors.locality" class="pl-3 text-orange-600 text-sm">
                {{ errors.locality }}
              </p>
            </div>
            <div class="inbox">
              <select
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.selectedState"
              >
                <option value="" class="text-gray-700">Select State*</option>
                <option
                  v-for="seller_state in formData.state"
                  :key="seller_state"
                  :value="seller_state"
                  class="text-gray-700"
                >
                  {{ seller_state }}
                </option>
              </select>
              <p v-if="errors.selectedState" class="pl-3 text-orange-600 text-sm">
                {{ errors.selectedState }}
              </p>
            </div>
            <div class="inbox">
              <input
                placeholder="landmark*"
                type="text"
                class="w-full py-2 px-3 text-xl border-b border-gray-300"
                v-model="formData.landmark"
              />
              <p v-if="errors.landmark" class="pl-3 text-orange-600 text-sm">
                {{ errors.landmark }}
              </p>
            </div>
            <button
              class="bgorange text-white py-2 px-3 text-xl rounded block min-w-[120px] w-full"
              @click="handleSubmit"
              :disabled="is_submitting ? true : false"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  <LoginModal :visible="visible" @closemodal="closeModal" :close="closeModal" />
</template>
<style lang="scss">
.becomeAsellerSection {
  background: url(../assets/images/seller.webp) no-repeat center;
  background-size: cover;
  &::after {
    background: rgb(0 0 0 / 35%);
  }
}
</style>
