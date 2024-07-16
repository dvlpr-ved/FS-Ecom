<script setup>
import { ref, watch } from "vue";

const otpDigits = ref([]);
const error = ref("");

const handleInput = (event) => {
  const value = event.target.value;
  if (!/^\d?$/.test(value)) {
    event.preventDefault();
    return;
  }
  otpDigits.value = value.split("").slice(0, 4);
  validateInput();
};

const validateInput = () => {
  error.value = otpDigits.value.some((digit) => digit === "")
    ? "Please fill all digits"
    : "";
};
watch(otpDigits, (newDigits) => {
  if (newDigits.length === 4 && newDigits.every((digit) => /^\d$/.test(digit))) {
    console.log("Validating OTP:", newDigits.join(""));
  }
});
</script>

<template>
  <div class="grid place-items-center place-content-center w-[50%] bg-gray-200 m-0" style="background-color:rgb(243, 244, 246) !important">
    <div>
      <input
        v-model="otpDigits"
        type="text"
        maxlength="4"
        placeholder="Enter Otp"
        @input="handleInput"
        class="border border-gray-300 rounded-md px-3 py-2 text-2xl text-center focus:outline-none bg-white w-full focus:border-blue-500"
        :class="{ 'border-red-500': error && otpDigits !== '' }"
      />
      <span v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</span>
      <div class=" text-center text-xxl py-2 text-blue-800">Otp sent to exmple@gamil.com</div>
      <button
        type="button"
        class="loginbtn bgorange py-2 px-3 rounded text-white text-2xl flex justify-center w-1/2 m-auto"
        @click="showOtp = true"
      >
        verify
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.border-red-500 {
  border-color: #ef4444;
}
</style>
