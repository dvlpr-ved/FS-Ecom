<script setup>

const CartItems = ref(12)
const WishlistItems = ref(2)
const NotiFication = ref(10)

</script>

<template>
    <OfferLine />
    <header class="AppHeader border-bottom">
        <div class="container flex fwrap items-center justify-between">
            <div class="headerLeft flex justify-between items-center">
                <a href="/" class="logo">
                    <span class="text-3xl uppercase">fashtsaly</span>
                </a>
                <button class="subscribe commonbtn lg:hidden block">subscribe</button>
                <div class="humbergIcon lg:hidden block">
                    <i class="pi pi-bars text-5xl"></i>
                </div>
            </div>

            <div class="searchField lg:flex hidden">
                <input placeholder="Search Here..." />
            </div>
            <!-- <SearchAutoComplete /> -->
            <ul class="navList flex items-center justify-center">
                <li class="icons user">
                    <i class="pi pi-user"></i>
                    <span class="text lg:inline block">Login</span>
                </li>
                <li class="lg:block hidden"> <button class="subscribe commonbtn">subscribe</button> </li>
                <li class="icons cart">
                    <i class="pi pi-shopping-cart"></i>
                    <span class="text lg:inline block">cart</span>
                    <span class="counter">{{ CartItems }}</span>
                </li>
                <li class="icons watchlist">
                    <i class="pi pi-bookmark"></i>
                    <span class="text lg:inline block">Wishlist</span>
                    <span class="counter">{{ WishlistItems }}</span>
                </li>
                <li class="icons notification">
                    <i class="pi pi-bell"></i>
                    <span class="text lg:inline block">Notification</span>
                    <span class="counter">{{ NotiFication }}</span>
                </li>
            </ul>
        </div>
    </header>
</template>


<style lang="scss" scoped>
.AppHeader {
    padding: 8px 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-bottom: 1px solid var(--gray);
    position: sticky;
    top: 0;
    z-index: 9;
    background-color: #fff;

    .logo {
        font-size: 25px;
        color: var(--black);
    }

    .searchField {
        width: 35%;

        input {
            width: 100%;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 18px;
            border-color: gainsboro;
            /*&:focus {
                box-shadow: 0 0 10px 12000px rgba(0, 0, 0, 0.39);
            }*/
        }
    }

    .navList {
        gap: 0 25px;
        text-transform: capitalize;

        .text {
            font-size: 16px;
        }

    }

    .icons {
        display: flex;
        align-items: center;
        position: relative;
        gap: 0 5px;

        &:hover {
            color: var(--primary);
            cursor: pointer;
        }

        .counter {
            position: absolute;
            left: 9px;
            top: -6px;
            background: var(--primary);
            color: var(--white);
            padding: 0 3px;
            font-size: 12px;
            border-radius: 2px;
        }

        i {
            font-size: 25px;

        }
    }
}

@media (max-width:767px) {
    .headerLeft {
        border-bottom: 1px solid #ddd;
        width: 100%;
        margin-bottom: 15px;
        padding-bottom: 8px;
    }

    .AppHeader {
        top: -15px;

        .navList {
            // padding: 0 15px;
            gap: 0 17px;
            justify-content: space-between;
            width: 100%;

            .text {
                font-size: 12px;
            }
        }
    }

    .icons {
        flex-wrap: wrap;
        flex-direction: column;

        .counter {
            left: 0;
            right: -13px;
            margin: 0 auto;
            width: fit-content;
            top: -7px;
        }
    }

    .commonbtn {
        padding: 8px 15px;
    }
}
</style>