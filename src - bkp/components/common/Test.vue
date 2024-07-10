<template>
    <h1 v-for="entry in data" :key="entry.id">{{entry.name}}</h1>
    <input :blur="handleblur()" type="text" v-model="model">
</template>

<script setup lang="ts">
    const model = ref("");
    

    const emit  = defineEmits(['ved']);
    
    const handleblur  =  () => {
        console.log('here');
        emit('ved' , 1);
    }
    const data  =  ref([
        {
            id : 1,
            name : 'ved',
        },
        {
            id : 2,
            name : 'bhupender'
        }
    ]);
</script>