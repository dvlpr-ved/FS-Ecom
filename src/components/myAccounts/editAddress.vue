<script lang="ts" setup>
const props = defineProps<{
  editing: boolean;
  toggleEdit: () => void;
}>();

const formData = ref({
  name: "User Name",
  email: "test@gmail.com",
  pincode: "0123456",
  locality: "1 26M, DDA Flats Pocket 1, New Kondli",
  address: "1 26M, DDA Flats Pocket 1, New Kondli",
  city: "New Delhi",
  states: ["Rajasthan", "Delhi", "Mp", "Up"],
  selectedState: "Delhi",
  landmark: "hanuman mandir",
  addresstype: "addtype",
});
</script>

<template>
  <div class="formdiv flex gap-5 flex-wrap">
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your Name</span>
      <input
        type="text"
        placeholder="Name"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.name"
      />
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your Email</span>
      <input
        type="email"
        placeholder="Phone No."
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.email"
      />
    </div>

    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
        >Area Pincode</span
      >
      <input
        placeholder="text"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.pincode"
      />
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
        >Your Locality</span
      >
      <input
        placeholder="text"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.locality"
      />
    </div>
    <div class="in_box w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
        >Your Address</span
      >
      <textarea
        placeholder="text"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.address"
      ></textarea>
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your City</span>
      <input
        placeholder="text"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.city"
      />
    </div>
    <div class="in_box lg:w-[48%] w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3">Your State</span>
      <select
        class="w-full py-3 px-3 text-[15px] border rounded text-gray-700 uppercase cursor-pointer border-gray-400"
        id="state"
        v-model="formData.selectedState"
      >
        <option v-for="state in formData.states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <i class="pi pi-angle-down"></i>
      </div>
    </div>
    <div class="in_box w-[100%] relative">
      <span class="absolute top-[-10px] bg-white px-3 border block ml-3"
        >Landmark Optional</span
      >
      <input
        placeholder="text"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.landmark"
      />
    </div>
    <!-- if needed remove class hidden and add flex -->
    <div class="radio_div w-full flex-wrap gap-x-4 hidden">
      <p class="w-full mb-2 text-[16px] headingsFont">Address Type</p>
      <div class="in_box flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="addresstype"
          class="h-[18px] w-[18px]"
          v-model="formData.addresstype"
          id="Home"
        />
        <label class="text-[15px] cursor-pointer" for="Home">Home</label>
      </div>
      <div class="in_box flex items-center gap-2 cursor-pointer">
        <input
          id="Work"
          type="radio"
          name="addresstype"
          class="h-[18px] w-[18px]"
          v-model="formData.addresstype"
        />
        <label class="text-[15px] cursor-pointer" for="Work">Work</label>
      </div>
    </div>
    <div class="in_box flex items-center gap-3 cursor-pointer">
      <button
        class="py-2 px-5 rounded text-white text-[15px] bgorange"
        @click="toggleEdit"
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
