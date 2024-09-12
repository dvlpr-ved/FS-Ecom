<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "~/components/layouts/default/AppHeader.vue";
import AppFooter from "~/components/layouts/default/AppFooter.vue";
import CopyRightLine from "~/components/layouts/default/CopyRightLine.vue";
import FixedFooter from "~/components/layouts/default/FixedFooter.vue";
import LoginModal from "~/components/layouts/default/loginModal.vue";
import SignUp from "~/components/layouts/default/signUp.vue";
import Otp from "~/components/layouts/default/Otp.vue";
import SearchAutoComplete from "~/components/layouts/default/SearchAutoComplete.vue";
import AppBanner from "~/components/common/AppBanner.vue";
import CateGories from "~/components/common/CateGories.vue";
import OfferLine from "~/components/common/OfferLine.vue";
import HomePageCard from "~/components/common/HomePageCard.vue";
import Highlights from "~/components/common/Highlights.vue";
import OfferBanner from "~/components/common/OfferBanner.vue";
import CommonCard from "~/components/common/CommonCard.vue";
import PagesBanner from "~/components/common/pagesBanner.vue";
import ProductDetail from "~/components/common/productDetail.vue";
import ProductZoomImages from "~/components/common/productZoomImages.vue";
import AddtoCartModal from "~/components/common/AddtoCartModal.vue";
import CheckOut from "~/components/common/CheckOut.vue";
import Faq from "~/components/common/Faq.vue";
import SeoContentSection from "~/components/common/SiteContentForLinks.vue";
import MyOrders from "~/components/common/MyOrders.vue";
import MyWhitelist from "~/components/common/MyWhitelist.vue";
import ShimmereCard from "~/components/common/ShimmereCard.vue";
import BlogList from "~/components/common/BlogList.vue";
import BookNow from "~/components/common/BookNow.vue";
import BlogDetail from "~/components/common/BlogDetail.vue";
import SiteMap from "~/components/common/SiteMap.vue";
import SimilarProducts from "~/components/common/SimilarProducts.vue";

// myaccounts
// import AsideBar from "~/components/myAccounts/asideBar.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
    FixedFooter,
    LoginModal,
    SignUp,
    SearchAutoComplete,
    AppBanner,
    CateGories,
    OfferLine,
    HomePageCard,
    Highlights,
    OfferBanner,
    CommonCard,
    PagesBanner,
    ProductDetail,
    ProductZoomImages,
    AddtoCartModal,
    CheckOut,
    Faq,
    SeoContentSection,
    MyOrders,
    MyWhitelist,
    ShimmereCard,
    BlogList,
    BookNow,
    BlogDetail,
    SiteMap,
    SimilarProducts,
  },
});
</script>

<template>
  <AppHeader />
  <div class="main_div_for_slots">
    <slot />
  </div>
  <AppFooter />
  <!-- <CopyRightLine /> -->
  <FixedFooter />
</template>

<style lang="scss">
@import "~/assets/styles/frontend/main.scss";
</style>
