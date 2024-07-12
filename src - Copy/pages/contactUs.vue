<script lang="ts" setup>

    const pageData =[
        {
            id:1,
            title:"Contact FASHTSALY",
            heading:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        }
    ]

</script>

<template>
    <PagesBanner
        v-for="data in pageData" 
            :key="data.id"
            :title="data.title"
            :heading="data.heading"
    />
</template>

<style scoped></style>
