<script lang="ts" setup>

const first = ref(0);

</script>
<template>
    <div class="SearchResultPage py-4">
        <div class="container flex flex-wrap justify-between">
            <aside class="LeftFilters lg:w-[20%] md:w-[100%] bg-gray-100 p-5 sticky h-[fit-content] top-2">
                <h1 class="text-3xl text-center">Filters</h1>
            </aside>
            <div class="rightSideCards lg:w-[79%] md:w-[100%]">
                <div class="CardsFlexdiv flex fwrap gap-x-3 gap-y-5 justify-center">
                    <CommonCard />
                </div>
                
                <!-- we will using infinite scroll instead of pagination -->

                <!-- <div class="card">
                    <Paginator v-model:first="first" :rows="1" :totalRecords="12"
                        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" />
                </div> -->

            </div>
        </div>
    </div>
</template>

<style scoped>
.CardsFlexdiv {
    justify-content: flex-start;
}

.p-paginator .p-paginator-current {
    height: 1rem !important;
}

@media (max-width:992px) {
    .CardsFlexdiv {
        justify-content: center;
    }
}
</style>
