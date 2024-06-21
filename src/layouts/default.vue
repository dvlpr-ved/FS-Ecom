<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '~/components/layouts/default/AppHeader.vue';
import AppFooter from '~/components/layouts/default/AppFooter.vue';
import SearchAutoComplete from '~/components/layouts/default/SearchAutoComplete.vue';
import AppBanner from '~/components/common/AppBanner.vue';
import CateGories from '~/components/common/CateGories.vue';
import OfferLine from '~/components/common/OfferLine.vue';
import HomePageCard from '~/components/common/HomePageCard.vue';
import Highlights from '~/components/common/Highlights.vue';
import OfferBanner from '~/components/common/OfferBanner.vue';
import CommonCard from '~/components/common/CommonCard.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    SearchAutoComplete,
    AppBanner,
    CateGories,
    OfferLine,
    HomePageCard,
    Highlights,
    OfferBanner,
    CommonCard,
  },
});
</script>

<template>
  <AppHeader />
  <div class="main_div_for_slots">
    <slot />
  </div>
  <AppFooter />
</template>

<style lang="scss">
@import '~/assets/styles/frontend/main.scss';
</style>
