<script setup lang="ts">
import { ref } from "vue";
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

const submitReply =async (id) => {
  const question = questions.value.find((q) => q.id === id);
  if (question && question.replyText.trim()) {
    question.isReplying = false;
    question.answer = question.replyText;
    // question.replyText = "";
  }
  const update = await publicApi({
    'url' : 'api/updateQuestionAnswers',
    method : 'POST',
    body : {
      id : question.id,
      answer : question.replyText
    }
  })
};
const questionAnswers = ref([]);
const getQuestionAnswers =async () => {
  const data =await publicApi({
    url : `api/getQuestionAnswers`,
    method : 'POST',
    body : {
      product_id : route.params.id
    }
  });
  questions.value = data;
}
onMounted(() => {
  getQuestionAnswers();
})
</script>

<template>
  <div class="askQuetionmain">
    <div class="askQuetion_inner">
      <div class="flexinput flex gap-3">
        <input
          type="text"
          class="p-2 rounded w-[100%] lg:w-[70%]"
          placeholder="Ask a question"
        />
        <button
          class="py-2 lg:w-[31%] w-[48%] text-xl bgorange transition text-white capitalize rounded flex items-center gap-2 justify-center"
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
            class="text-blue-600 pl-1 cursor-pointer"
            @click="startReplying(question.id)"
          >
            Reply
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
