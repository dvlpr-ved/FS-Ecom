<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from '~/components/layouts/default/AppHeader.vue';
import AppBanner from '~/components/common/AppBanner.vue';
import CateGories from '~/components/common/CateGories.vue';

export default defineComponent({
  components: {
    AppHeader,
    AppBanner,
    CateGories,
  },
});
</script>

<template>
  <AppHeader />
  <AppBanner />
  <CateGories />
</template>

<style lang="scss">
@import '~/assets/styles/frontend/main.scss';
</style>
