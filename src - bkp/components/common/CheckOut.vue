<template>
    <div class="flex justify-center mt-10">
        <div class="w-full max-w-4xl px-4">
            <div class="flex flex-wrap -mx-4">
                <!-- Left side: Product details -->
                <div class="w-full lg:w-2/3 px-4 mb-4">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center">
                            <div class="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                                <img src="https://blogs.rmkv.com/wp-content/uploads/2023/11/rmkv-silk-sarees-model-blog-banner.jpg"
                                    alt="Product Image" class="object-cover w-full h-full">
                            </div>
                            <div class="ml-4">
                                <h2 class="text-lg font-semibold">Product Name</h2>
                                <p class="text-gray-600">Product description or details</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="flex items-center">
                                <label class="mr-2">Quantity:</label>
                                <input type="number"
                                    class="border border-gray-300 px-3 py-1 rounded-md w-16 text-center"
                                    v-model="quantity">
                            </div>
                            <div class="mt-2">
                                <p class="font-semibold">Total Price: ₹{{ totalPrice }}</p>
                            </div>
                            <!-- Remove product button -->
                            <button @click="removeProduct" class="mt-2 text-white px-4 py-1 rounded-md"
                                style="background: red;">
                                Remove Product
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Right side: Order details -->
                <div class="w-full lg:w-1/3 px-4 mb-4">
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define reactive variables
const quantity = ref(1);
const totalPrice = ref(500);
const subtotal = ref(500);
const shipping = ref(5);
const total = ref(505);

// Function to remove product
const removeProduct = () => {
    // Simulate removing product
    quantity.value = 0; // Reset quantity
    totalPrice.value = 0; // Reset total price
    subtotal.value = 0; // Reset subtotal
    total.value = 0; // Reset total
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
