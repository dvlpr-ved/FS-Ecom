<script>
const rating = 5;
</script>
<template>
    <div class="productdetail_man_div py-5">
        <div class="container">
            <div class="flexdiv flex f-wrap justify-between">
                <div class="detailGallery lg:w-[48%] w-[100%] bg-gray-200" style="display: grid; place-items:center;">

                    <div class="text-5xl capitalize">product images</div>
                </div>

                <div class="productcontent lg:w-[50%] w-[100%]">
                    <h6 class="pro-title lg:text-4xl text-2xl mb-3">Banarasi Blue Saree </h6>
                    <div class="review-and-retaing flex gap-3 mb-3 items-center">
                        <div class="stars flex gap-1">
                            <template v-for="stars in 4">
                                <i class="pi pi-star-fill" style="color: var(--primary);"></i>
                            </template>
                        </div>
                        <NuxtLink to="#review">1 review</NuxtLink>
                    </div>
                    <div class="price">
                        <p class="cardtitle text-2xl font-[500] text-black mb-3"><span class="line-through text-gray-700">₹700</span> ₹700</p>
                    </div>
                    <article class="productdesc mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto nostrum non nulla obcaecati officiis, repellat molestiae quae animi.</article>
                    <p class="mb-3 text-gray-500">Available: 73 - Sold: <span class="text-[red]">61</span> </p>
                    <span class="py-1 px-2 border border-gray-300 text-green-500 block w-[fit-content]">In Stock</span>
                </div>
            </div>
        </div>
    </div>
</template>