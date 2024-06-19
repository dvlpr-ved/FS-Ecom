<template>
    <header class="AppHeader">
        <div class="container flex items-center justify-between">
            <a href="/" class="logo">Logo Here</a>
            <div class="searchField">
                <input placeholder="Search Here..." />
            </div>
            <ul class="navList flex items-center justify-center">
                <li class="icons user">
                    <i class="pi pi-user"></i>
                    <span class="text">user name</span>
                </li>
                <li> <button class="subscribe commonbtn">subscribe</button> </li>
                <li class="icons cart">
                    <i class="pi pi-shopping-cart"></i>
                    <span class="text">cart</span>
                    <span class="counter">02</span>
                </li>
                <li class="icons watchlist">
                    <i class="pi pi-bookmark"></i>
                    <span class="text">Wishlist</span>
                    <span class="counter">02</span>
                </li>
                <li class="icons notification">
                    <i class="pi pi-bell"></i>
                    <span class="text">Notification</span>
                    <span class="counter">02</span>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.AppHeader {
    padding: 8px 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

    .container {}

    .logo {
        font-size: 25px;
        color: var(--black);
    }

    .searchField {
        width: 30%;

        input {
            width: 100%;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 16px;
            /*&:focus {
                box-shadow: 0 0 10px 12000px rgba(0, 0, 0, 0.39);
            }*/
        }
    }

    .navList {
        gap: 0 15px;
        text-transform: capitalize;

        .text {
            display: none;
            font-size: 12px;
        }

    }

    .icons {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        &:hover {
            color: var(--primary);
            cursor: pointer;
        }

        .counter {
            position: absolute;
            right: -8px;
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
</style>