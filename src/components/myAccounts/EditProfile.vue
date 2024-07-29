<script lang="ts" setup>
import { ref } from "vue";

const formData = ref({
  name: "User Name",
  lname: "Last Name",
  email: "user@gmail.com",
  gender: "male",
});

const editing = ref(false);

function toggleEdit() {
  editing.value = !editing.value;

  if (!editing.value) {
    formData.value = {
      name: "User Name",
      lname: "Last Name",
      email: "user@gmail.com",
      gender: "male",
    };
  }
}

function saveChanges() {
  editing.value = false;
}
</script>

<template>
  <div class="editProfile_div bg-white p-5 rounded-sm">
    <div class="titeldiv flex gap-2 items-center mb-5">
      <p class="text-xl headingsFont font-[500]">Personal Information</p>
      <span class="text-blue-700 font-[500] text-xl cursor-pointer" @click="toggleEdit">{{
        editing ? "Cancel" : "Edit"
      }}</span>
    </div>
    <div class="formdiv flex gap-5 flex-wrap">
      <div class="in_box lg:w-[45%] w-[100%]">
        <input
          type="text"
          placeholder="Name"
          class="w-full py-3 px-3 text-[15px] border rounded text-gray-700 uppercase"
          v-model="formData.name"
          :disabled="!editing"
        />
      </div>

      <!-- if has lname -->
      <div class="in_box lg:w-[45%] w-[100%]">
        <input
          type="text"
          placeholder="Last Name"
          class="w-full py-3 px-3 text-[15px] border rounded text-gray-700 uppercase"
          v-model="formData.lname"
          :disabled="!editing"
        />
      </div>

      <div class="gender_div w-full flex flex-wrap gap-x-4">
        <p class="w-full mb-2 text-[16px] headingsFont">Your Gender</p>
        <div class="in_box flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            class="h-[18px] w-[18px]"
            v-model="formData.gender"
            id="male"
            :disabled="!editing"
          />
          <label class="text-[15px] cursor-pointer" for="male">Male</label>
        </div>
        <div class="in_box flex items-center gap-2 cursor-pointer">
          <input
            id="female"
            type="radio"
            name="gender"
            class="h-[18px] w-[18px]"
            v-model="formData.gender"
            :disabled="!editing"
          />
          <label class="text-[15px] cursor-pointer" for="female">Female</label>
        </div>
      </div>
      <div class="in_box lg:w-[45%] w-[100%]">
        <input
          placeholder="Email"
          class="w-full py-3 px-3 text-[15px] border rounded text-gray-700 uppercase"
          v-model="formData.email"
          :disabled="!editing"
        />
      </div>
      <button
        class="py-2 px-5 text-white text-[15px] bgblue80"
        @click="saveChanges"
        :disabled="!editing"
      >
        SAVE
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.commonbox {
}
</style>
