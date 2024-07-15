<script setup lang="ts">
const props = defineProps<{
    title?: string;
    heading?: string;
    description?: string;
    imageUrl?: string;
  }>();
</script>
<template>
    <div class="relative pagesBanner pb-5">
        <div class="content_div container">
            <div class="div_inner flex fwrap justify-center">
                <div class="leftside lg:w-[70%] w-[100%] bg-white lg:p-[40px] shadow">                    
                    <span class="mb-3 inline-block" style="color:var(--primary)">{{props.title}}</span>
                    <h4 class="heading lg:text-5xl text-3xl font-weight-[600] mb-5">{{props.heading}}</h4>
                    <p class="mb-5 text-[16px]"> {{props.description}}</p> 
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.pagesBanner {
    background: url('../../assets/images/pages/pagesBanner.jpg') no-repeat top center;
}
.content_div {
    padding-top: 250px !important;
}
@media (max-width:767px) {
    .pagesBanner {
        background-size: contain;
    }
    .content_div {
        padding-top: 120px!important;
    }
    .rightside{
        margin: 15px 0;
        padding-top: 15px;
        border-top: 1px solid var(--gray);
    }
}
</style>