<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  close: () => void;
}>();

const value = ref(null);
const ChnagePosition = ref("");
const showMessage = ref("");

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

const toggelForm = () => {
  ChnagePosition.value = "active";
};
</script>

<template>
  <Dialog :visible="props.visible" modal class="p-0" :style="{ width: '1024px' }">
    <div class="flexDialog flex flex-wrap justify-between relative">
      <div
        :class="[
          'fixedBanner',
          'absolute',
          'lg:w-[50%]',
          'w-[100%]',
          'bgblue80',
          'z-10',
          ChnagePosition,
        ]"
      >
        <img
          class="brightness-[0.]"
          src="assets/images/common/signup.png"
          alt="subscriber"
        />
        <NuxtLink
          href="subscriptionplans"
          class="absolute bottom-[20%] left-0 right-0 w-fit m-auto commonbtn py-2 px-5 animate-bounce text-2xl"
          @click="props.close"
          >Subscriber</NuxtLink
        >
      </div>

      <!-- Signup Form -->
      <signUp />

      <div
        class="rightCol lg:w-[50%] w-[100%] lg:p-6 p-3 bg-gray-100"
        style="background-color: rgb(243, 244, 246) !important"
      >
        <div class="heading text-center lg:text-5xl text-3xl lg:mb-4 mb-2">Login</div>

        <p class="text-[red] text-center">{{ showMessage }}</p>

        <form @submit="handleSubmit">
          <div class="flex items-center gap-4 mb-4">
            <input
              type="email"
              class="lg:py-3 py-2 text-xl px-2 rounded border-gray-400 border w-[100%]"
              autocomplete="off"
              placeholder="Enter Email"
              v-model="formData.email"
            />
          </div>
          <div class="flex items-center gap-4 mb-4">
            <input
              class="lg:py-3 py-2 text-xl px-2 rounded border-gray-400 border w-[100%]"
              autocomplete="off"
              type="password"
              placeholder="Enter Password"
              v-model="formData.password"
            />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="loginbtn bgorange py-2 px-5 rounded text-white text-2xl flex justify-center max-w-[220px] w-full m-auto"
          >
            Login
          </button>
        </form>

        <span class="text-center block text-4xl py-3">OR</span>

        <span
          href="#"
          class="py-2 px-3 rounded text-white text-2xl commonbtn block max-w-[220px] w-full text-center m-auto mb-4 cursor-pointer"
          style="background: #204887"
          @click="toggelForm"
        >
          Register
        </span>
      </div>

      <Button
        type="button"
        id="closebtn"
        class="absolute top-0 right-0 bg-transparent z-10"
        @click="props.close"
      >
        <i class="pi pi-times text-3xl text-gray-600"></i>
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
@media (max-width: 576px) {
  .p-component-overlay-enter {
    overflow-y: scroll;
    padding: 5px;
    box-shadow: unset;
  }
  .flexDialog {
    .fixedBanner {
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
    }
  }
}
</style>
