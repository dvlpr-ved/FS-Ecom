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
                        <button @click="handleAddToCart" class="py-3 w-[48%] bg-black transition text-white capitalize rounded flex items-center gap-2 justify-center  hover:bg-[white] hover:border hover:border-black hover:text-gray-900"><i class="pi pi-cart-plus lg:text-3xl text-2xl"></i> Add
                            to cart</button>
                            <button class="w-[48%]">
                                <BookNow 
                                :bounceAni="'animate-bounce'" 
                                bookingLink="https://api.whatsapp.com/send?phone=+910123456789&text=Hello, Looking for banarasee saree. Get in touch with me my name is"
                              />    
                            </button>
                    </div>
                    <div class="sharediv py-5 flex gap-2 items-end">
                        <span class="lg:text-2xl mb-1">Share Now : </span>
                        <a href="JavaScript:void(0)"> <i class="pi pi-instagram text-2xl transition"></i> </a>
                        <a href="JavaScript:void(0)"> <i class="pi pi-whatsapp text-2xl transition"></i> </a>
                        <a href="JavaScript:void(0)"> <i class="pi pi-facebook text-2xl transition"></i> </a>
                        <!-- <a href="JavaScript:void(0)"> <i class="pi pi-pinterest text-2xl transition"></i> </a> -->
                        <a href="JavaScript:void(0)"> <i class="pi pi-twitter text-2xl transition"></i> </a>
                    </div>

                    <div class="vendrsDetail">
                        <div class="flex pb-2 gap-2 items-center lg:text-[18px] text-1xl">Seller Name : <span class="text-gray-600" style="font-size:16px;">Devesh</span> </div>
                        <div class="flex pb-2 gap-2 items-center lg:text-[18px] text-1xl">Seller Contact : <span class="text-gray-600" style="font-size:16px;">devesh@gmail.com</span> </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <AddtoCartModal :Checkvisible="Checkvisible" :handleAdCartClose="handleAdCartClose" />
</template>

<style lang="scss">

.wtsp{}
    .sharediv{
        i{ border: 1px solid var(--primary); padding: 8px; background-color: var(--primary); color: var(--white); border-radius: 50px;
            &:hover{color: var(--primary); background: transparent}
        }
    }
</style>