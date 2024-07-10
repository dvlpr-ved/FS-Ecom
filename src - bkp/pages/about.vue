<script lang="ts" setup>

    const pageData =[
        {
            id:1,
            title:"About FASHTSALY",
            heading:"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur possimus eos minima fugit. Numquam, hic a illum unde consectetur aliquam iusto itaque ipsum, vel fugit reiciendis necessitatibus eos quisquam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt mollitia modi, adipisci quasi corrupti hic eos voluptates iste maiores quam nisi officiis dolorum sunt doloribus consequuntur. Quod, tempora ea. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur possimus eos minima fugit. Numquam, hic a illum unde consectetur aliquam iusto itaque ipsum, vel fugit reiciendis necessitatibus eos quisquam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt mollitia modi, adipisci quasi corrupti hic eos voluptates iste maiores quam nisi officiis dolorum sunt doloribus consequuntur. Quod, tempora ea.`,
        }
    ]

</script>

<template>
    <PagesBanner
        v-for="data in pageData" 
            :key="data.id"
            :title="data.title"
            :heading="data.heading"
            :description="data.description"
    />
    
</template>

<style scoped></style>
