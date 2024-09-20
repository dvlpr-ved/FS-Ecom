<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const authStore = useAuthStore();
const editProfile = useProfileStore();

const show = (message) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

const formData = ref({
  name: authStore.getUser.name,
  lname: "",
  phone: "",
  email: authStore.getUser.email,
  gender: authStore.userData.gender || "",
  // gender: "m",
  image: null,
  image_name: null,
});

const editing = ref(false);
const is_saving = ref(false);
const successMessage = editProfile.successMessage;

function toggleEdit() {
  editing.value = !editing.value;

  if (!editing.value) {
    formData.value = {
      name: authStore.getUser.name,
      lname: "",
      email: authStore.getUser.email,
      gender: authStore.userData.gender || "",
      // gender: "m",
      phone: "",
      image: "",
      image_name: "",
    };
  }
}

const saveChanges = async () => {
  const genderValue = formData.value.gender === "male" ? "m" : "f";
  is_saving.value = true;

  try {
    const res = await editProfile.fetchEditProfile({
      name: formData.value.name,
      gender: genderValue,
      phone: formData.value.phone,
      image: null,
      image_name: null,
    });
    if (res) {
      editing.value = false;
      is_saving.value = false;
      show("Profile Updated");
    }
    editing.value = false;
    is_saving.value = false;
    show("we are facing Network issue Please Try Again");
  } catch (error) {
    console.error("Failed to save changes:", error);
    show("we are facing Network issue Please Try Again");
    is_saving.value = false;
    editing.value = false;
  }
};

// onMounted(() => {
//   // formData.value.gender = authStore.userData.gender;
//   // console.log(formData.value.gender);

// });
</script>

<template>
  <Toast />
  <div id="editprofile" class="editProfile_div bg-white p-5 rounded-sm">
    <div class="titeldiv flex gap-2 items-center pb-2">
      <p class="text-xl font-[500]">Personal Information</p>
      <span class="text-blue-700 font-[500] text-xl cursor-pointer" @click="toggleEdit">
        {{ editing ? "Cancel" : "Edit" }}
      </span>
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

      <div class="gender_div w-full flex flex-wrap gap-x-4">
        <p class="w-full mb-2 text-[16px]">Your Gender</p>
        <div class="in_box flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            class="h-[18px] w-[18px]"
            v-model="formData.gender"
            value="male"
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
            value="female"
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
          readOnly
        />
      </div>
      <div class="in_box lg:w-[45%] w-[100%]">
        <input
          placeholder="Phone*"
          pattern="[7-9]{1}[0-9]{9}"
          title="Phone number"
          class="w-full py-3 px-3 text-[15px] border rounded text-gray-700 uppercase"
          v-model="formData.phone"
          :disabled="!editing"
        />
      </div>
      <button
        class="py-2 px-5 text-white text-[15px] bg-blue-600"
        @click="saveChanges"
        :disabled="!editing"
      >
        {{ is_saving ? "saving" : "save" }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.commonbox {
  // Add any common styles here if needed
}
</style>
