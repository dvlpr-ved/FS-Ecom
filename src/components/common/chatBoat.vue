<script setup lang="ts">
const props = defineProps<{
  chatBoatVisible: boolean;
  closeBoat: () => void;
}>();
import { useToast } from "primevue/usetoast";

const toast = useToast();
const show = (message) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

const authStore = useAuthStore();
const emit = defineEmits(["closeBoat"]);
function closeBoat() {
  emit("closeBoat");
}

const is_submitting = ref(false);
const question = ref("");
const questions = ref<string[]>([]);

const submitForm = async (e) => {
  e.preventDefault();
  if (question.value.trim() === "") {
    show("Please enter your message");
    return;
  }
  is_submitting.value = true;
  try {
    const url = "https://fashtsaly.com/API/public/api/submitQuestionchat";
    await fetchFromSanctum({
      url: url,
      method: "POST",
      body: {
        ques: question.value,
      },
    });

    questions.value.push(question.value);
    question.value = "";
  } catch (error) {
    show(`We're facing some network issues, please try again later.`);
  } finally {
    is_submitting.value = false;
  }
};
</script>

<template>
  <div
    v-if="props.chatBoatVisible"
    class="chatboat z-10 shadow max-w-[400px] min-h-[85vh] bg-white w-full fixed right-0 bottom-0"
  >
    <div class="flex justify-between bgblue81 p-3">
      <div class="leftside">
        <p class="text-white capitalize text-xl">🙋‍♂️ {{ authStore.getUser.name }}</p>
        <p class="text-white capitalize">How can we help you?</p>
      </div>
      <button @click="closeBoat"><i class="pi pi-times text-2xl text-white"></i></button>
    </div>
    <div class="flex flex-wrap justify-between h-full">
      <div class="messagesbox p-3 min-h-[59vh] max-h-[59vh] w-full overflow-auto">
        <div
          v-for="(q, index) in questions"
          :key="index"
          class="capitalize text-[13px] bg-gray-200 w-fit p-2 rounded mb-3 questions"
        >
          {{ q }}
        </div>
        <p class="capitalize text-[13px] bg-gray-200 w-fit p-2 rounded mb-3 answers">
          How can we help you?
        </p>
      </div>
      <form
        class="inputbox flex justify-between px-3 w-full p-2 border-t border-gray-400"
        @submit="submitForm"
      >
        <input
          type="text"
          class="w-[90%] border-0"
          v-model="question"
          placeholder="send a message"
        />
        <button type="submit"><i class="pi pi-send text-2xl"></i></button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chatboat {
  .questions {
    margin: 0 0 auto auto;
  }
  .answers {
    /* Add styles if needed */
  }
  .messagesbox {
    overflow: scroll;
  }
}
</style>
