<script setup lang="ts">
const props = defineProps<{
  chatBoatVisible: boolean;
  closeBoat: () => void;
}>();
import { useToast } from "primevue/usetoast";
const unreadMsgs = useUnreadMsg();

const toast = useToast();
const show = (message: string) => {
  toast.add({ severity: "info", detail: message, life: 3000 });
};

const authStore = useAuthStore();
const emit = defineEmits(["closeBoat"]);
function closeBoat() {
  emit("closeBoat");
}

const isSubmitting = ref(false);
const isLoading = ref(false);
const question = ref("");
const messages = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const getChatAnswer = async (page: number = 1) => {
  isLoading.value = true;
  try {
    const url = `https://fashtsaly.com/API/public/api/getchat?page=${page}`;
    const response = await fetchFromSanctum({ url, method: "GET" });

    if (response && response.success) {
      totalPages.value = response.data.last_page;
      // console.log(response.data.data);
      messages.value = [...response.data.data.reverse(), ...messages.value];
    } else {
      show("Failed to load chat");
    }
  } catch (error) {
    show("Failed to load chat");
  } finally {
    isLoading.value = false;
  }
};

const submitForm = async (e: Event) => {
  e.preventDefault();
  if (question.value.trim() === "") {
    show("Please enter your message");
    return;
  }
  isSubmitting.value = true;

  try {
    const url = "https://fashtsaly.com/API/public/api/submitQuestionchat";
    await fetchFromSanctum({
      url,
      method: "POST",
      body: { ques: question.value },
    });

    question.value = "";
    currentPage.value = 1;
    messages.value = [];
    await getChatAnswer();
  } catch (error) {
    show("We're facing some network issues, please try again later.");
  } finally {
    isSubmitting.value = false;
  }
};

const handleScroll = async () => {
  const messagesBox = document.querySelector(".messagesbox");
  if (
    messagesBox &&
    messagesBox.scrollTop === 0 &&
    currentPage.value < totalPages.value
  ) {
    const previousHeight = messagesBox.scrollHeight;
    currentPage.value++;
    await getChatAnswer(currentPage.value);
    messagesBox.scrollTop = messagesBox.scrollHeight - previousHeight;
  }
};

// console.log("unreadMsgs", unreadMsgs);

onMounted(() => {
  unreadMsgs.fetchUnreadMsg();
  getChatAnswer(currentPage.value);
});
</script>

<template>
  <div
    v-if="props.chatBoatVisible"
    class="chatboat z-20 shadow lg:max-w-[400px] max-w-[100%] lg:min-h-[85vh] min-h-[100vh] bg-white w-full fixed right-0 bottom-0"
  >
    <div class="flex justify-between bg-blue-800 p-3">
      <div class="leftside">
        <p class="text-white capitalize text-xl">🙋‍♂️ {{ authStore.getUser.name }}</p>
        <p class="text-white capitalize">How can we help you?</p>
      </div>
      <button @click="closeBoat">
        <i class="pi pi-times text-2xl text-white"></i>
      </button>
    </div>
    <div class="flex flex-wrap justify-between h-full">
      <div
        class="messagesbox p-3 min-h-[59vh] max-h-[59vh] w-full overflow-auto"
        @scroll="handleScroll"
      >
        <span v-if="isLoading" class="ladingmore text-center block">
          <i class="pi pi-spin pi-spinner text-5xl text-blue-700"></i>
        </span>
        <div v-for="(msg, index) in messages" :key="index">
          <p class="capitalize text-[13px] bg-gray-200 w-fit p-2 rounded mb-3 questions">
            {{ msg.ques }}
          </p>
          <p
            v-if="msg.answer"
            v-for="(a, index) in msg.answer"
            :key="index"
            class="capitalize text-[13px] bg-gray-200 w-fit p-2 rounded mb-3 answers"
          >
            {{ a }}
          </p>
        </div>
      </div>
      <form
        class="inputbox flex justify-between px-3 w-full p-2 border-t border-gray-400"
        @submit="submitForm"
      >
        <input
          type="text"
          class="w-[90%] border-0"
          v-model="question"
          placeholder="Send a message"
        />
        <button type="submit" :disabled="isSubmitting ? true : false">
          <i class="pi pi-send text-2xl"></i>
        </button>
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
  }
  .messagesbox {
    overflow: auto;
  }
}
</style>
