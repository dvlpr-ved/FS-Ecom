<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const show = (message, DieLife = 4000) => {
  toast.add({ severity: "success", detail: message, life: DieLife });
};
const authStore = useAuthStore();
const route = useRoute();
const questions = ref([
  { id: 1, text: "What's its fabric?", replyText: "", isReplying: false },
  { id: 2, text: "How should I wash it?", replyText: "", isReplying: false },
]);

const startReplying = (id) => {
  const question = questions.value.find((q) => q.id === id);
  if (question) {
    question.isReplying = true;
  }
};

const submitReply = async (id) => {
  const question = questions.value.find((q) => q.id === id);
  // if (question && question.replyText.trim()) {
  if (!question.replyText) {
    show("Please Enter Your Reply");
    question.answer = question.replyText;
    // question.isReplying = false;
    // question.replyText = "";
    return;
  }
  const update = await publicApi({
    url: "api/updateQuestionAnswers",
    method: "POST",
    body: {
      id: question.id,
      answer: question.replyText,
    },
  });
  question.isReplying = false;
  getQuestionAnswers();
};
const questionAnswers = ref([]);
const getQuestionAnswers = async () => {
  const data = await publicApi({
    url: `api/getQuestionAnswers`,
    method: "POST",
    body: {
      product_id: route.params.id,
    },
  });
  questions.value = data;
};
const asked_question = ref("");
console.log("asked_question.value here", asked_question.value);

const is_submitting_question = ref(false);
const submitQuestion = async () => {
  if (!asked_question.value.trim()) {
    show("Please Type Your Question");
    return;
  }
  is_submitting_question.value = true;
  const submit = await fetchFromSanctum({
    url: `https://fashtsaly.com/API/public/api/submitQuestion`,
    method: "POST",
    body: {
      question: asked_question.value,
      product_id: route.params.id,
    },
  });
  if (submit.success) {
    asked_question.value = "";
    questions.value = submit.data;
  }
  is_submitting_question.value = false;
};

onMounted(() => {
  getQuestionAnswers();
});
</script>

<template>
  <Toast />
  <div class="askQuetionmain">
    <div class="askQuetion_inner">
      <div class="flexinput flex gap-3">
        <input
          type="text"
          class="p-2 rounded w-[100%] lg:w-[70%]"
          placeholder="Ask a question"
          v-model="asked_question"
        />
        <button
          :disabled="is_submitting_question ? true : false"
          class="py-2 lg:w-[31%] w-[48%] text-xl bgorange transition text-white capitalize rounded flex items-center gap-2 justify-center"
          @click="submitQuestion"
        >
          Submit
        </button>
      </div>
      <div
        v-for="question in questions"
        :key="question.id"
        class="mt-3 flex gap-2 border border-gray-300 p-2"
      >
        <img src="assets/images/users/user.png" class="h-[20px]" loading="lazy" />
        <div class="cont-side">
          <p class="text headingsFont">{{ question.question }}</p>
          <p
            v-if="authStore.userData.is_admin"
            class="text-blue-600 pl-1 cursor-pointer"
            @click="startReplying(question.id)"
          >
            {{ question.answer ? "Edit Reply" : "Reply" }}
          </p>
          <div v-if="question.isReplying">
            <input
              v-model="question.replyText"
              type="text"
              class="p-2 rounded border border-gray-300"
              placeholder="Type your reply"
            />
            <button
              @click="submitReply(question.id)"
              class="ml-2 py-2 px-3 bgblue80 text-white rounded"
            >
              Send
            </button>
          </div>
          <p v-if="!question.isReplying" class="text-gray-600 pl-3">
            <!-- Display a placeholder text or the actual reply if available -->
            {{ question.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Add your styles here */
</style>
