<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "~/components/layouts/default/AppHeader.vue";
import AppFooter from "~/components/layouts/default/AppFooter.vue";
import CopyRightLine from "~/components/layouts/default/CopyRightLine.vue";
import FixedFooter from "~/components/layouts/default/FixedFooter.vue";
import LoginModal from "~/components/layouts/default/loginModal.vue";

// myaccounts
import AsideBar from "~/components/myAccounts/asideBar.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    AsideBar
  },
});
</script>

<template>
  <AppHeader />
  <section class="myAccounts bg-gray-200 lg:py-5">
    <div class="container lg:px-2 p-0">
      <div class="flexdivPanel flex flex-wrap justify-between">
        <AsideBar />
        <div class="accountsRightPanel lg:w-[74%] w-[100%]">
          <slot />
        </div>
        <!-- <RightSideBar /> -->
      </div>
    </div>
  </section>
  <AppFooter />
  <CopyRightLine />
  <FixedFooter />
</template>

<style lang="scss">
@import "~/assets/styles/frontend/main.scss";
.myAccounts {
  .container {
    max-width: 1124px;
  }
}
</style>
