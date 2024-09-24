<script setup lang="ts">
import { emit } from "process";

const props = defineProps<{
  visible: boolean;
  close: () => void;
}>();
const emits = defineEmits(["closemodal"]);
const value = ref(null);
const ChangePosition = ref("inactive");
const showMessage = ref("");
const formToggelInMb = ref("loginFormMain");

const closemodal = () => {
  emits("closemodal");
};
const formData = {
  email: "",
  password: "",
};

const authStore = useAuthStore();

const isFormValid = computed(() => {
  return formData.email !== "" && formData.password !== "";
});

const isSubmitting = ref(false);

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!isFormValid.value) return;

  isSubmitting.value = true;

  try {
    const response = await fetch("https://fashtsaly.com/API/public/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    const payload = { ...responseData, data: responseData.user };
    if (responseData.success) {
      authStore.Login(payload);
      window.location.reload();
    } else {
      showMessage.value = responseData.msg;
    }
  } catch (error) {
    console.log("error in login", error);
    showMessage.value = "An error occurred. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

const toggleForm = () => {
  ChangePosition.value = ChangePosition.value === "active" ? "inactive" : "active";
};

const handleToggelMb = () => {
  formToggelInMb.value =
    formToggelInMb.value === "loginFormMain" ? "notloginFormMain" : "loginFormMain";
};
const showPasswordReset = ref(false);
const processForgetPassword = async () => {
  if (formData.email) {
    forget_pass_data.email = formData.email;
    const resendOtp = await publicApi({
      url: `api/resend-otp`,
      method: "POST",
      body: {
        email: forget_pass_data.email,
        type: "FORGOT",
      },
    });
    if (resendOtp.success) {
      showPasswordReset.value = true;
    } else {
      alert("Email is not registered with us");
    }
  } else {
    alert("Pelase enter E-mail");
  }
};
const forget_pass_data = reactive({
  otp: "",
  email: "",
  new_password: "",
});
const resetError = ref("");
const resetSuccess = ref("");
const handlePasswordForget = async () => {
  const resetPass = await publicApi({
    url: "api/forgetPassword",
    method: "POST",
    body: {
      email: forget_pass_data.email,
      otp: forget_pass_data.otp,
      pass: forget_pass_data.new_password,
    },
  });
  if (resetPass.success) {
    resetSuccess.value = "Password changed successfully! please log in";
    showPasswordReset.value = false;
  } else {
    resetError.value = resetPass.msg;
  }
};
const handleForgetPasswordBack = () => {
  showPasswordReset.value = false;
};
</script>

<template>
  <Dialog :visible="props.visible" modal class="p-0" :style="{ width: '950px' }">
    <div class="flexDialog flex flex-wrap justify-between relative overflow-hidden">
      <div
        :class="[
          'fixedBanner',
          'absolute',
          'lg:w-[50%]',
          'w-[100%]',
          'lg:block',
          'hidden',
          'bgblue800',
          'z-10',
          ChangePosition,
        ]"
      >
        <img
          class="brightness-[0.] w-full"
          src="assets/images/common/signup.png"
          alt="subscriber"
        />
        <NuxtLink
          href="subscriptionplans"
          class="absolute bottom-[20%] left-0 right-0 w-fit m-auto commonbtn py-2 px-5 animate-bounce text-2xl"
          @click="closemodal"
          >Subscriber</NuxtLink
        >
      </div>

      <!-- Signup Form -->
      <signUp :toggleForm="toggleForm" :visible="visible" />

      <div
        :class="`rightCol loginFormMain lg:w-[50%] w-[100%] lg:p-6 p-3 ${formToggelInMb}`"
      >
        <div class="heading text-center lg:text-3xl text-2xl mb-4 headingsFont">
          {{ !showPasswordReset ? "Login" : "Reset password" }}
        </div>

        <p class="text-[red] text-center">{{ showMessage }}</p>
        <form v-if="!showPasswordReset" @submit="handleSubmit">
          <div class="flex items-center gap-4 mb-4">
            <input
              type="email"
              class="lg:py-[16px] py-2 text-xl lg:px-3 px-2 rounded border-gray-400 border w-[100%]"
              autocomplete="off"
              placeholder="Enter Email"
              v-model="formData.email"
            />
          </div>
          <div class="flex items-center gap-4">
            <input
              class="lg:py-[16px] py-2 text-xl lg:px-3 px-2 rounded border-gray-400 border w-[100%]"
              autocomplete="off"
              type="password"
              placeholder="Enter Password"
              v-model="formData.password"
            />
          </div>
          <div class="text-success text-center mt-2 text-green-500">
            {{ resetSuccess }}
          </div>
          <div class="text-right mb-4 hover:text-primary cursor-pointer">
            <span @click="processForgetPassword">Forgot password</span>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="loginbtn bgorange lg:py-[20px] py-2 px-5 rounded text-white lg:text-2xl text-xl commonbtn flex justify-center max-w-[220px] w-full m-auto"
          >
            Login
          </button>
        </form>
        <form v-else>
          <div class="flex items-center gap-4 mb-4">
            <input
              type="text"
              name="reset otp"
              class="lg:py-[16px] py-2 text-xl lg:px-3 px-2 rounded border-gray-400 border w-[100%]"
              placeholder="Enter OTP"
              v-model="forget_pass_data.otp"
            />
          </div>
          <div class="flex items-center gap-4">
            <input
              class="lg:py-[16px] py-2 text-xl lg:px-3 px-2 rounded border-gray-400 border w-[100%]"
              type="password"
              name="new password"
              placeholder="Enter New Password"
              v-model="forget_pass_data.new_password"
            />
          </div>
          <div class="text-center text-danger">{{ resetError }}</div>
          <div class="text-right mb-4 hover:text-primary cursor-pointer">
            <span @click="handleForgetPasswordBack">Back</span>
          </div>
          <button
            type="submit"
            @click.prevent="handlePasswordForget"
            :disabled="isSubmitting"
            class="loginbtn bgorange lg:py-[20px] py-2 px-5 rounded text-white lg:text-2xl text-xl commonbtn flex justify-center max-w-[220px] w-full m-auto"
          >
            Reset password
          </button>
        </form>

        <span class="text-center lg:block hidden text-4xl lg:py-3 py-1">OR</span>

        <button
          class="loginbtn bgorange lg:py-[20px] py-2 px-5 rounded text-white lg:text-2xl text-xl commonbtn lg:flex hidden justify-center max-w-[220px] w-full m-auto"
          style="background: #204887"
          @click="toggleForm"
        >
          Register
        </button>
      </div>

      <div
        class="loginSignInBtnsMb py-2 px-2 bgblue80 lg:hidden flex justify-center fixed bottom-0 left-0 right-0"
      >
        <button class="text-2xl text-white" @click="handleToggelMb">
          {{ formToggelInMb === "loginFormMain" ? "SignUp" : "Login" }}
        </button>
      </div>

      <Button
        type="button"
        id="closebtn"
        class="absolute top-0 right-0 bg-transparent z-50"
        @click="props.close"
      >
        <i @click="props.close" class="pi pi-times text-3xl text-gray-600"></i>
      </Button>
    </div>
  </Dialog>
</template>

<style lang="scss">
.p-dialog .p-dialog-header {
  display: none;
  .p-dialog-content {
    padding: 0;
  }
}
.p-dialog .p-dialog-content {
  padding: 0 !important;
}

.flexDialog {
  .fixedBanner {
    position: absolute;
    left: 0;
    &.active {
      transition: all 0.8s ease-in-out;
      left: 50%;
    }
    &.inactive {
      transition: all 0.8s ease-in-out;
    }
  }
  .loginbtn {
    span {
      display: none;
    }
  }
  input {
    font-size: 16px;
  }
  .p-button {
    background: var(--primary);
    border: 0;
  }

  .p-button:enabled:hover {
    opacity: 0.8;
    background-color: var(--primary);
  }

  .p-dialog-header-icon {
    display: none;
  }
}
#closebtn {
  z-index: 33;
}
@media (max-width: 768px) {
  .p-component-overlay-enter {
    overflow-y: scroll;
    padding: 0;
    box-shadow: unset;
    .p-dialog {
      height: 100%;
      background-color: #fff;
    }
  }
  .flexDialog {
    /*.fixedBanner {
      height: 50%;
      &.active {
        left: 0;
        right: 0;
        bottom: 0;
        height: 48%;
      }
      img {
        height: 100%;
        object-fit: cover;
      }
    }*/
    .loginFormMain {
      visibility: visible;
      position: absolute;
      z-index: 2;
      background: #fff;
      height: 70vh;
    }
    .notloginFormMain {
      z-index: -1;
      visibility: visible;
    }
  }
}
</style>
