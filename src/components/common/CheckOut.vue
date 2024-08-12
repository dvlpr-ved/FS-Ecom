<template>
    <div class="flex justify-center mt-10 flex-wrap">
        <div class="w-full max-w-4xl px-4">
            <div class="flex flex-wrap -mx-4">
                <div v-for="product in items" :key="product.id" class="w-full lg:w-2/3 px-4 mb-4">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center">
                            <div class="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                                <img :src="product.image[0] ? product.image[0].source : ''"
                                    alt="Product Image" class="object-cover w-full h-full">
                            </div>
                            <div class="ml-4">
                                <h2 class="text-lg font-semibold">{{ product.product_name }}</h2>
                                <p class="text-gray-600">{{ product.description }}</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="flex items-center">
                                <label class="mr-2">Quantity:</label>
                                <input type="number"
                                    class="border border-gray-300 px-3 py-1 rounded-md w-16 text-center"
                                    v-model="quantities[product.id]" @input="updateTotalPrice(product)">
                            </div>
                            <div class="mt-2">
                                <p class="font-semibold">Total Price: ₹{{ product.totalPrice  }}</p>
                            </div>
                            <button @click="removeProduct(product.id)" class="mt-2 text-white px-4 py-1 rounded-md"
                                style="background: red;">
                                Remove Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full max-w-4xl px-4">
            <div class="flex grid">
                <div v-for="address in userAddress" class="card col-12  sm:col-6 ">
                    <h2 class="text-xl font-semibold">
                        <input type="radio" :checked="selectedAddress == address.id ? true : false" @click="handleAddressSelection(address)">
                        {{ address.name }} ({{ address.phone }})
                    </h2>
                    <h3 class="text-lg font-semibold">{{ address.address ? address.address : ''  }} , {{ address.locality ? address.locality : '' }} , {{ address.landmark ? address.landmark : '' }}</h3>
                    <h3 class="text-lg font-semibold">{{ address.city ? address.city : ''  }} - {{ address.pincode ? address.pincode : ''  }} , {{ address.city ? address.city : '' }}</h3>
                </div>
            </div>
            <h1 class="text-2xl font-semibold mb-3">Shipping Details</h1>
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
            </div>
        </div>
        <div class="w-full max-w-6xl px-4">
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
                <div class="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>₹{{ subtotal }}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>₹{{ shipping }}</span>
                </div>
                <hr class="my-2">
                <div class="flex justify-between mb-2">
                    <span class="font-semibold">Total:</span>
                    <span class="font-semibold">₹{{ total }}</span>
                </div>
                <button class="mt-4 hover:opacity-90 text-white px-4 py-2 rounded-md" style="background:var(--primary)">Proceed to
                    Payment</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const quantities = ref({});
const items = ref([]);
const totalPrice = ref(0);
const subtotal = ref(0);
const shipping = ref(5);
const total = ref(0);
const selectedAddress = ref(null); 

const useGetAddressStore = useGetAddress();
const userAddress = computed(() => useGetAddressStore.userAddress || []);
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
}

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
    items.value = items.value.filter(item => item.id !== productId);
    updateSubtotal();
};

const updateTotalPrice = (product) => {
    const quantity = quantities.value[product.id];
    product.totalPrice = product.price * quantity;
    updateSubtotal();
};

const updateSubtotal = () => {
    subtotal.value = items.value.reduce((acc, item) => {
        return acc + (item.price * (quantities.value[item.id] || 0));
    }, 0);
    total.value = subtotal.value + shipping.value;
};

const getCheckoutProduct = async () => {
    const res = await fetchFromSanctum({url : 'https://fashtsaly.com/API/public/api/getCheckoutProducts' , method : 'POST' });
    if (res.success) {
        items.value = res.data;
        items.value.forEach(item => {
            quantities.value[item.id] = item.quantity;
            item.totalPrice = item.price * item.quantity; 
        });
        updateSubtotal();
    }
}


onMounted(async () => {
    await getCheckoutProduct();
    useGetAddressStore.fetchUserAddress();
});

</script>

<style scoped>
</style>
