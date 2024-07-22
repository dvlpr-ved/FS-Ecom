<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Choose a Plan</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(plan, index) in plans" :key="index" class="bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <div class="flex items-center justify-center h-12">
          <span class="text-xl font-bold">{{ plan.title }}</span>
        </div>
        <div class="flex items-center justify-center mt-4">
          <span class="text-gray-700 text-lg">{{ plan.price }}</span>
        </div>
        <ul class="text-sm text-gray-600 mt-4 flex-1">
          <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-center mb-2">
            <i class="pi pi-check-circle text-green-500 mr-2"></i> {{ feature }}
          </li>
        </ul>
        <button class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded self-center">
          Subscribe
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: [
        {
          title: "Basic",
          price: "$10",
          features: ["Feature 1", "Feature 2", "Feature 3"],
        },
        {
          title: "Standard",
          price: "$20",
          features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        },
        {
          title: "Premium",
          price: "$30",
          features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* PrimeVue Icon Styles */
@import 'primevue/resources/primevue.min.css';
@import 'primevue/resources/themes/saga-blue/theme.css';
@import 'primeicons/primeicons.css';
</style>
