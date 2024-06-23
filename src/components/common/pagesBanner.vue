<script setup>

</script>
<template>
    <div class="relative pagesBanner">
        <div class="content_div container">
            <div class="div_inner flex fwrap justify-between items-end">
                <div class="leftside lg:w-[70%] w-[100%] bg-white lg:p-[40px]">
                    <span class="mb-3 inline-block" style="color:var(--primary)">About FASHTSALY</span>
                    <h4 class="heading lg:text-5xl text-3xl font-weight-[600] mb-5">Lorem ipsum dolor, sit amet
                        consectetur adipisicing elit.</h4>
                    <p class="mb-5 text-[16px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                        possimus eos minima fugit. Numquam, hic a illum unde consectetur aliquam iusto itaque ipsum, vel
                        fugit reiciendis necessitatibus eos quisquam animi. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Laborum incidunt mollitia modi, adipisci quasi corrupti hic eos voluptates
                        iste maiores quam nisi officiis dolorum sunt doloribus consequuntur. Quod, tempora ea.</p>
                    <p class="text-[16px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur possimus eos
                        minima fugit. Numquam, hic a illum unde consectetur aliquam iusto itaque ipsum, vel fugit
                        reiciendis necessitatibus eos quisquam animi. Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Laborum incidunt mollitia modi, adipisci quasi corrupti hic eos voluptates iste maiores
                        quam nisi officiis dolorum sunt doloribus consequuntur. Quod, tempora ea.</p>
                </div>
                <div class="rightside lg:w-[30%] w-[100%] lg:pl-[35px] lg:pb-[95px]">
                    <div class="head flex gap-[8px] items-center mb-3">
                        <i class="pi pi-home text-3xl" style="color: var(--primary);"></i>
                        <span class="uppercase">FASHTSALY Store</span>
                    </div>
                    <p class="mb-3">Jaipur — 785 15h Street, Office 478/B Green Mall, De 81566</p>
                    <span class="block">Phone: contact@example.com</span>
                    <span>Email: <a href="#" style="color: var(--primary);">contact@example.com</a> </span>
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