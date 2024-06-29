<script setup lang="ts">

const data = [
  {
    id: 1,
    title: 'Siril',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/o/q/free-3671s2574-samah-unstitched-original-imahyhhchhk94gzk.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/o/q/free-3671s2574-samah-unstitched-original-imahyhhchhk94gzk.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/d/k/free-3671s2574-samah-unstitched-original-imahyhhcyekqzufh.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/7/d/k/free-3671s2574-samah-unstitched-original-imahyhhcyekqzufh.jpeg?q=70',
    ],
  },
  {
    id: 2,
    title: 'Samah',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/j/p/d/free-815s199a-samah-unstitched-original-imagqtpefyzx42zk.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/j/p/d/free-815s199a-samah-unstitched-original-imagqtpefyzx42zk.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/j/p/d/free-815s199a-samah-unstitched-original-imagqtpefyzx42zk.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/j/p/d/free-815s199a-samah-unstitched-original-imagqtpefyzx42zk.jpeg?q=70',
    ],
  },
  {
    id: 3,
    title: 'hesika',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/v/t/x/free-3629s2531-samah-unstitched-original-imahyp4dgqwqsbvy.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/v/t/x/free-3629s2531-samah-unstitched-original-imahyp4dgqwqsbvy.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/v/t/x/free-3629s2531-samah-unstitched-original-imahyp4dgqwqsbvy.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/v/t/x/free-3629s2531-samah-unstitched-original-imahyp4dgqwqsbvy.jpeg?q=70',
    ],
  },
  {
    id: 4,
    title: 'Leelavati',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
    ],
  },
  {
    id: 5,
    title: 'Suali',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/1/r/1/free-3448s1082-3451s1098-samah-unstitched-original-imahyhjgsyg2hsg5.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/1/r/1/free-3448s1082-3451s1098-samah-unstitched-original-imahyhjgsyg2hsg5.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/1/r/1/free-3448s1082-3451s1098-samah-unstitched-original-imahyhjgsyg2hsg5.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/1/r/1/free-3448s1082-3451s1098-samah-unstitched-original-imahyhjgsyg2hsg5.jpeg?q=70',
    ],
  },
  {
    id: 6,
    title: 'fashion Day',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/f/d/6/free-women-s-banarasi-silk-saree-avdom-unstitched-original-imagzqhrbzhkpbyd.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/f/d/6/free-women-s-banarasi-silk-saree-avdom-unstitched-original-imagzqhrbzhkpbyd.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/f/d/6/free-women-s-banarasi-silk-saree-avdom-unstitched-original-imagzqhrbzhkpbyd.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/f/d/6/free-women-s-banarasi-silk-saree-avdom-unstitched-original-imagzqhrbzhkpbyd.jpeg?q=70',
    ],
  },
  {
    id: 7,
    title: 'fashion Day',
    price: 500,
    desc: 'AIR STRIKE Football Shoes For Men',
    thumbnail: 'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
    images: [
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/612/612/xif0q/sari/r/m/k/free-2774s191-samah-unstitched-original-imagzbggmcxzyerm.jpeg?q=70',
    ],
  },
]

</script>

<template>
  <div class="commonCard shadow transition" v-for="(item, index) in data">
    <a href="../productdetail/" :key="index">
      <figure class="relative">
        <img class="w-full cardimg" :src="item.thumbnail" alt="highlight img">
        <div class="watchListIcons absolute top-[15px] right-[15px]">
          <i class="text-2xl pi pi-heart" style="color: rgb(239 68 68);"></i>
          <i class="text-2xl pi pi-heart-fill" style="color:rgb(239 68 68);"></i>
        </div>
      </figure>
      <div class="cardContent p-2">
        <p class="cardtitle text-gray-500 font-bold">{{ item.title }}</p>
        <p class="cardtitle text-gray-700 text-2xl font-bold">₹{{ item.price }} <span class="line-through">₹700</span></p>
        <p class="card_desc">{{ item.desc.slice(1, 30) }}...</p>
      </div>
    </a>
  </div>
</template>



<script setup>

</script>

<style lang="scss" scoped>
.commonCard {
  max-width: 24%;

  &:hover {
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .11);
  }

  .cardimg {
    max-height: 300px;
    object-fit: cover;
  }

  .pi-heart-fill {
    display: none;
  }

  .pi-heart {
    &:hover {
      display: none;

      +.pi-heart-fill {
        display: block;
      }
    }
  }
}

@media (min-width:768px) {
  .commonCard{
    max-width: 31%;
  }
}
</style>
