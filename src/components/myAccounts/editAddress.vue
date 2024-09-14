<script lang="ts" setup>
const props = defineProps<{
  editing: boolean;
  toggleEdit: () => void;
  data: Object;
}>();

const stateStore = useGetStateStore();
const allStates = ref([]);

const editAddress = useAddressStore();
const useGetAddressStore = useAddressStore();
const formData = ref({
  id: 0,
  name: "User Name",
  email: "test@gmail.com",
  phone: "0123123123",
  phoneOpt: "0999999999",
  pincode: "0123456",
  locality: "1 26M, DDA Flats Pocket 1, New Kondli",
  address: "1 26M, DDA Flats Pocket 1, New Kondli",
  city: "New Delhi",
  // states: ["Rajasthan", "Delhi", "Mp", "Up"],
  states: allStates,
  selectedState: "",
  landmark: "hanuman mandir",
  addresstype: "addtype",
});
watch(
  props.data,
  () => {
    const dataPrev = props.data;
    formData.value.entry_id = dataPrev.id;
    formData.value.name = dataPrev.name;
    formData.value.email = dataPrev.email;
    formData.value.phone = dataPrev.phone;
    formData.value.pincode = dataPrev.pincode;
    formData.value.locality = dataPrev.locality;
    formData.value.address = dataPrev.address;
    formData.value.city = dataPrev.city;
    formData.value.selectedState = dataPrev.state;
    formData.value.landmark = dataPrev.landmark;
    formData.value.id = dataPrev.id;
  },
  { immediate: true }
);
const saveChanges = async () => {
  const res = await editAddress.fetchUpdateAddAddress({
    entry_id: formData.value.id,
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
  if (res) {
    useGetAddressStore.fetchUserAddress();
    props.toggleEdit();
  } else {
  }
};

onMounted(async () => {
  await stateStore.fetchAllStates();
  allStates.value = stateStore.stateList;
});
</script>

<template>
  <!-- {{data}} -->
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
        >Phone No. Primary</span
      >
      <input
        type="tel"
        class="w-full py-3 px-3 text-[15px] border rounded border-gray-500 text-gray-700 uppercase"
        v-model="formData.phone"
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
    <div class="in_box lg:w-[100%] w-[100%] relative">
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
        <option value="">Select State</option>
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
