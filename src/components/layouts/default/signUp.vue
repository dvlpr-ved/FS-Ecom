<script setup lang="ts">
const visible = ref(false);

const closeModal = () => {
  visible.value = false;
};

const handleSubmit = (event) => {
  event.preventDefault();
};
const inputType = ref("password");

const toggleFieldType = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div
    class="maindiv flex justify-center items-center py-5"
    style="background: #f1f1f1; border-bottom: 1px solid #ddd"
  >
    <div class="innerdiv max-w-[900px] w-full bg-white rounded">
      <div class="flexdiv flex flex-wrap justify-between">
        <div
          class="leftContent lg:w-[45%] w-[100%] bgblue80 text-white p-4 flex justify-center items-center text-center"
        >
          <div>
            <h5 class="heading lg:text-6xl text-3xl mb-4">Welcome Back!</h5>
            <p class="mb-4 text-xl">
              To stay connected with us, please log in using your personal information.
            </p>
            <button
              class="commonbtn px-6 py-3 text-xl"
              label="Show"
              @click="visible = true"
            >
              SignIn
            </button>
          </div>
        </div>
        <div class="formSide lg:w-[55%] w-[100%] p-5">
          <h5 class="heading lg:text-6xl text-3xl text-center mb-4">
            Create an Account!
          </h5>

          <div class="inputFields lg:px-5 px-4 border-bottom" @submit="handleSubmit">
            <div class="inputbox mb-3">
              <input
                type="text"
                class="py-2 text-xl border-0 border-b w-full border-gray-400"
                placeholder="Enter Your Name*"
              />
            </div>
            <div class="inputbox mb-3">
              <input
                type="email"
                class="py-2 text-xl border-0 border-b w-full border-gray-400"
                placeholder="Enter Your Email*"
              />
            </div>
            <div class="inputbox mb-3 relative">
              <input
                :type="inputType"
                class="py-2 text-xl border-0 border-b w-full border-gray-400"
                placeholder="Enter Your password*"
              />
              <button @click="toggleFieldType" class="absolute right-[15px] top-3">
                <span v-if="inputType === 'password'" class="pi pi-eye"></span>
                <span v-else class="pi pi-eye-slash"></span>
              </button>
            </div>
            <div class="inputbox mb-3 relative">
              <input
                :type="inputType"
                class="py-2 text-xl border-0 border-b w-full border-gray-400"
                placeholder="Confirm password*"
              />
              <button @click="toggleFieldType" class="absolute right-[15px] top-3">
                <span v-if="inputType === 'password'" class="pi pi-eye"></span>
                <span v-else class="pi pi-eye-slash"></span>
              </button>
            </div>
            <button class="commonbtn px-8 py-3 text-xl block w-fit rounded m-auto">SignUp</button>
          </div>

          <span class="text-center block text-2xl py-3">OR</span>

          <a
            href="#"
            class="px-5 py-3 text-xl rounded text-white commonbtn block w-[fit-content] m-auto mb-4"
            style="background: #204887"
            >Login With Google</a
          >
        </div>
      </div>
    </div>
  </div>
  <LoginModal :visible="visible" :close="closeModal" />
</template>

<style lang="scss">
.maindiv {
  height: 100%;
  min-height: 70vh;
  width: 100%;
}

.rounded {
  border-radius: 3px !important;
}
</style>
