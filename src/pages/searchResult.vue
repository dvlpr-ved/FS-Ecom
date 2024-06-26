<script lang="ts" setup>

const first = ref(0);

</script>
<template>
    <div class="SearchResultPage py-4">
        <div class="container flex justify-between">
            <aside class="LeftFilters lg:block hidden w-[20%] bg-gray-100"></aside>
            <div class="rightSideCards lg:block hidden w-[79%]">
                <div class="CardsFlexdiv flex fwrap gap-x-3 gap-y-5">
                    <CommonCard />
                </div>
                <div class="card">
                    <Paginator v-model:first="first" :rows="1" :totalRecords="12"
                        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.p-paginator .p-paginator-current {
    height: 1rem !important;
}
</style>
