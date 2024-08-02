<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const inputType = ref("password");
const successMessage = ref("");
const authStore = useAuthStore();

const isOtpFeildVisible = ref(false);
const formData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const formError = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const handleSubmit = async (event) => {
  event.preventDefault();

  let isValid = true;

  if (!formData.name) {
    formError.name = "Please Enter Name";
    alert("Please Enter Name");
    isValid = false;
    return;
  }
  if (!formData.email) {
    formError.email = "Please Enter Email";
    alert("Please Enter Email");
    isValid = false;
    return;
  }
  if (!formData.password) {
    formError.password = "Please Enter Password";
    alert("Please Enter Password");
    isValid = false;
    return;
  }
  if (!formData.confirmPassword) {
    formError.confirmPassword = "Please Confirm Password";
    alert("Please Confirm Password");
    isValid = false;
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    formError.confirmPassword = "Passwords do not match";
    alert("Passwords do not match");
    isValid = false;
    return;
  }

  if (isValid) {
    try {
      const url = isOtpFeildVisible.value
        ? `https://fashtsaly.com/API/public/api/signUp`
        : `https://fashtsaly.com/API/public/api/send-otp`;
      const payload = isOtpFeildVisible.value
        ? {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            otp: formData.otp,
          }
        : {
            email: formData.email,
          };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (!response.ok) {
        if (responseData.errors) {
          formError.email = responseData.errors.email ? responseData.errors.email[0] : "";
          formError.password = responseData.errors.password
            ? responseData.errors.password[0]
            : "";
          formError.name = responseData.errors.name ? responseData.errors.name[0] : "";
          formError.otp = responseData.errors.otp ? responseData.errors.otp[0] : "";
        } else {
        }
      } else {
        if (!isOtpFeildVisible.value) {
          isOtpFeildVisible.value = true;
        } else {
          authStore.Login(responseData);
        }
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  }
};

const closeModal = () => {
  visible.value = false;
};
const toggleFieldType = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div
    class="signupmaindiv lg:w-[50%] w-[100%] lg:p-5 p-2"
    style="background: #f1f1f1; border-bottom: 1px solid #ddd"
  >
    <div class="formSide">
      <h5 class="heading lg:text-5xl text-3xl text-center lg:mb-4 mb-2">Create an Account!</h5>

      <form class="inputFields lg:px-5 px-4 border-bottom" @submit="handleSubmit">
        <div v-if="!isOtpFeildVisible">
          <div class="inputbox mb-3">
            <input
              type="text"
              class="py-2 text-xl border-0 border-b w-full border-gray-400"
              placeholder="Enter Your Name*"
              v-model="formData.name"
            />
            <p class="text-[red]">{{ formError.name }}</p>
          </div>
          <div class="inputbox mb-3">
            <input
              type="email"
              class="py-2 text-xl border-0 border-b w-full border-gray-400"
              placeholder="Enter Your Email*"
              v-model="formData.email"
            />
            <p class="text-[red]">{{ formError.email }}</p>
          </div>
          <div class="inputbox mb-3 relative">
            <input
              :type="inputType"
              class="py-2 text-xl border-0 border-b w-full border-gray-400"
              placeholder="Enter Your Password*"
              v-model="formData.password"
            />
            <p class="text-[red]">{{ formError.password }}</p>
            <!-- <button @click="toggleFieldType" class="absolute right-[15px] top-3">
              <span v-if="inputType.value === 'password'" class="pi pi-eye"></span>
              <span v-else class="pi pi-eye-slash"></span>
            </button> -->
          </div>
          <div class="inputbox mb-3 relative">
            <input
              :type="inputType"
              class="py-2 text-xl border-0 border-b w-full border-gray-400"
              placeholder="Confirm Password*"
              v-model="formData.confirmPassword"
            />
            <p class="text-[red]">{{ formError.confirmPassword }}</p>
            <!-- <button @click="toggleFieldType" class="absolute right-[15px] top-3">
              <span v-if="inputType.value === 'password'" class="pi pi-eye"></span>
              <span v-else class="pi pi-eye-slash"></span>
            </button> -->
          </div>
        </div>
        <div v-if="isOtpFeildVisible" class="inputbox mb-3">
          <p class="text-center text-lg mb-3">
            Please enter OTP we have just sent to {{ formData.email }}
          </p>
          <input
            type="text"
            class="py-2 text-xl border-0 border-b w-full border-gray-400"
            placeholder="Enter OTP"
            v-model="formData.otp"
          />
          <p class="text-[red]">{{ formError.otp }}</p>
        </div>
        <button class="commonbtn py-2 px-5 text-xl block rounded m-auto max-w-[220px] w-full">
          Sign Up
        </button>
      </form>

      <span class="text-center block text-2xl lg:py-3 py-1">OR</span>

      <a
        href="#"
        class="py-2 px-5 text-xl rounded text-white commonbtn block  m-auto lg:mb-4 mb-2 max-w-[220px] w-full"
        style="background: #204887"
        >Login With Google</a
      >
    </div>
  </div>
</template>

<style lang="scss">
.signupmaindiv {
}

.rounded {
  border-radius: 3px !important;
}
</style>
