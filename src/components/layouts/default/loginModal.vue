<script setup lang="ts">
import Password from "primevue/password";
const props = defineProps<{
  visible: boolean;
  close: () => void;
}>();

const value = ref(null);
</script>

<template>
  <Dialog :visible="visible" modal class="p-0" :style="{ width: '1024px' }">
    <div class="flexDialog flex justify-between relative">
      <div class="leftCol lg:w-[50%] w-[100%] bgblue80 relative">
        <img
          class="brightness-[0.]"
          src="assets/images/common/signup.png"
          alt="subscriber"
        />
        <a
          href="#"
          class="absolute bottom-[20%] left-0 right-0 w-fit m-auto commonbtn py-2 px-5 animate-bounce text-2xl"
          >Subscriber</a
        >
      </div>
      <div class="leftCol lg:w-[50%] w-[100%] p-6 bg-gray-100">
        <div class="heading text-center text-5xl mb-4">Login</div>
        <div class="flex items-center gap-4 mb-4">
          <!-- <label for="email" class="font-semibold w-24">Email</label> -->
          <input
            type="email"
            class="py-3 text-xl px-2 rounded border-gray-400 border w-[100%]"
            autocomplete="off"
            placeholder="Enter Email"
          />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <!-- <label for="password" class="font-semibold w-24">Password</label> -->
          <input
            class="py-3 text-xl px-2 rounded border-gray-400 border w-[100%]"
            autocomplete="off"
            type="password"
            placeholder="Enter Password"
          />
          <!-- <InputText type="password" id="password" class="flex-auto" autocomplete="off" /> -->
        </div>

        <Button
          type="button"
          class="loginbtn text-2xl px-5 flex justify-center w-1/2 m-auto"
          @click="visible = false"
          >Login</Button
        >

        <span class="text-center block text-4xl py-3">OR</span>
        <a
          href="../signup"
          class="py-2 px-3 rounded text-white text-2xl commonbtn block w-1/2 text-center m-auto mb-4"
          style="background: #204887"
          >Register</a
        >
      </div>
      <Button type="button" class="absolute top-0 right-0 bg-transparent" @click="close">
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
</style>
