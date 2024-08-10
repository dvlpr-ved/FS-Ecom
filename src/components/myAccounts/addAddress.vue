<script lang="ts" setup>
const props = defineProps<{
  editing: boolean;
  toggleAddress: () => void;
}>();

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

const addAddressStore = useAddAddress();
const successMessage = addAddressStore.successMessage;
console.log(successMessage);


const saveChanges = async () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = "";
  });

  let isValid = true;

  if (!formData.value.name) {
    errors.value.name = "Name is required";
    isValid = false;
  }

  if (!formData.value.email) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = "Invalid email address";
    isValid = false;
  }

  if (!formData.value.phone) {
    errors.value.phone = "Phone number is required";
    isValid = false;
  }

  if (!formData.value.pincode) {
    errors.value.pincode = "Pincode is required";
    isValid = false;
  }

  if (!formData.value.locality) {
    errors.value.locality = "Locality is required";
    isValid = false;
  }

  if (!formData.value.address) {
    errors.value.address = "Address is required";
    isValid = false;
  }

  if (!formData.value.city) {
    errors.value.city = "City is required";
    isValid = false;
  }

  if (!formData.value.selectedState) {
    errors.value.selectedState = "State is required";
    isValid = false;
  }

  if (!isValid) {
    return;
  }
  
  try {
    const success = await addAddressStore.fetchAddAddress({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      pincode: formData.value.pincode,
      locality: formData.value.locality,
      address: formData.value.address,
      city: formData.value.city,
      states: formData.value.selectedState,
      landmark: formData.value.landmark,
    });

    if (success) {
      console.log("Address added successfully");
      props.toggleAddress();
    } else {
      console.error(addAddressStore.error);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
</script>

<template>
  <div class="formdiv flex gap-5 flex-wrap mb-3">
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your Name</span>
      <input
        type="text"
        placeholder="Name"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.name"
      />
      <p v-if="errors.name" class="text-[red] text-sm">{{ errors.name }}</p>
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your Email</span>
      <input
        type="email"
        placeholder="Email"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.email"
      />
      <p v-if="errors.email" class="text-[red] text-sm">{{ errors.email }}</p>
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
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
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
        >Area Pincode</span
      >
      <input
        placeholder="Pincode"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.pincode"
      />
      <p v-if="errors.pincode" class="text-[red] text-sm">{{ errors.pincode }}</p>
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
      <p v-if="errors.locality" class="text-[red] text-sm">{{ errors.locality }}</p>
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
      <p v-if="errors.address" class="text-[red] text-sm">{{ errors.address }}</p>
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your City</span>
      <input
        placeholder="City"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.city"
      />
      <p v-if="errors.city" class="text-[red] text-sm">{{ errors.city }}</p>
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your State</span>
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
    <div class="in_box flex items-center gap-3 cursor-pointer">
      <button
        class="py-2 px-5 rounded text-white text-[15px] bgorange"
        @click="props.toggleAddress"
      >
        Cancel
      </button>
      <button
        class="py-2 px-5 rounded text-white text-[15px] bgblue80"
        @click="saveChanges"
      >
        SAVE
      </button>
    </div>
  </div>
</template>
