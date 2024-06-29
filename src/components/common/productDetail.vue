<script setup lang="ts">

const Checkvisible = ref('')
const productCount = ref(1)

const addMoreProduct = () => {
    productCount.value++
}
const removeMoreProduct = () => {
    if (productCount.value > 1) productCount.value--
    // else return;
}

const handleAddToCart = () => {
    Checkvisible.value = 'active';
}
const handleAdCartClose = () => {
    Checkvisible.value = '';
}

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
                    <div class="price">
                        <p class="cardtitle text-2xl font-[500] text-black mb-3">
                            <span class="line-through text-gray-700">₹800</span> ₹700
                        </p>
                    </div>
                    <article class="productdesc mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
                        nostrum non nulla obcaecati officiis, repellat molestiae quae animi.</article>
                    <div class="productCounter mb-3 flex gap-4 border border-gray-400 p-2 px-3 w-[fit-content]">
                        <button @click="removeMoreProduct"><i class="pi pi-minus"></i></button>
                        <span>{{ productCount }}</span>
                        <button @click="addMoreProduct"><i class="pi pi-plus"></i></button>
                    </div>
                    <div class="btnsdiv flex justify-between">
                        <button @click="handleAddToCart" class="py-3 w-[48%] bg-black text-white capitalize rounded">Add
                            to cart</button>
                        <a href="#" class="py-3 w-[48%] bg-green-400 text-white capitalize rounded text-center">chat on
                            whatsapp</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddtoCartModal :Checkvisible="Checkvisible" :handleAdCartClose="handleAdCartClose" />
</template>