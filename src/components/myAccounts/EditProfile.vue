<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
const authStore = useAuthStore();
const editProfile = useProfileStore();

const show = (message: string) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

const formData = ref({
  name: authStore.getUser.name,
  lname: "",
  phone: authStore.getUser.phone,
  email: authStore.getUser.email,
  gender: authStore.getUser.gender,
  image: null,
  image_name: null,
});

const editing = ref(false);
const is_saving = ref(false);
const previewImage = ref(null);

const toggleEdit = () => {
  editing.value = !editing.value;

  if (!editing.value) {
    formData.value = {
      name: authStore.getUser.name,
      lname: "",
      email: authStore.getUser.email,
      gender: authStore.getUser.gender,
      phone: authStore.getUser.phone,
      image: null,
      image_name: null,
    };
    previewImage.value = null;
  }
};

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onloadend = () => {
      previewImage.value = reader.result;
      formData.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    show("Please select a valid image file.");
  }
};

const saveChanges = async () => {
  is_saving.value = true;

  try {
    const res = await editProfile.fetchEditProfile({
      name: formData.value.name,
      gender: formData.value.gender,
      phone: formData.value.phone,
      image: formData.value.image,
      image_name: null,
    });

    if (res) {
      show("Profile Updated successfully");
      editing.value = false;
    } else {
      show("We are facing a network issue. Please try again.");
    }
  } catch (error) {
    console.error("Failed to save changes:", error);
    show("We are facing a network issue. Please try again.");
  } finally {
    is_saving.value = false;
  }
};
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
      <div class="in_box lg:w-[45%] w-[100%] flex">
        <input
          type="file"
          :disabled="!editing"
          accept="image/*"
          @change="onFileChange"
          class="border border-gray-300 rounded-lg p-2 w-[80%]"
        />
        <img v-if="previewImage" :src="previewImage" class="h-14 pl-2" />
      </div>

      <div class="gender_div w-full flex flex-wrap gap-x-4">
        <p class="w-full mb-2 text-[16px]">Your Gender</p>
        <div class="in_box flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="gender"
            class="h-[18px] w-[18px]"
            v-model="formData.gender"
            value="M"
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
            value="F"
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
        :disabled="!editing || is_saving"
      >
        {{ is_saving ? "Saving..." : "Save" }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.commonbox {
  // Add any common styles here if needed
}
</style>
