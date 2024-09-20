<script lang="ts" setup>
const route = useRoute();
const metadataStore = useMetadataStore();
const pageMeta = ref({ title: "", description: "", meta_tags: [] });

watch(
  () => route.path,
  async () => {
    await metadataStore.fetchMetaData();
    pageMeta.value = metadataStore.getPageMeta(route.path);
  },
  { immediate: true }
);

watchEffect(() => {
  useHead({
    title: pageMeta.value.title || "Privacy Policy",
    meta: [
      {
        name: "description",
        content:
          pageMeta.value.description || "Online Shopping Site for Reselling Products",
      },
      {
        name: "keywords",
        content:
          pageMeta.value.meta_tags?.join(", ") ||
          "Online Shopping in India, online Shopping store, Online Shopping Site, Buy Online, Shop Online, Online",
      },
    ],
  });
});
</script>

<template>
  <section class="staticPages afterBefore">
    <!-- <div class="imgdiv">
      <h3 class="text-5xl font-semibold text-white text-center pagesHeading afterBefore">
        Privacy Policy
      </h3>
    </div> -->
    <div class="container lg:py-5 py-4">
      <h3 class="text-4xl font-bold mb-5 mt-2 text-center">Privacy Policy</h3>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We, Fashtsaly are committed to protecting the privacy of our users. This Privacy
          Policy outlines how we collect, use, share, and protect the personal information
          that we collect from our users.
        </p>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Access to Information</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          You can visit the Website and browse without having to provide personal details.
          During your visit to the Website you remain anonymous and at no time can we
          identify you unless you have provided the information or created an account on
          the Website.
        </p>
      </div>
      <div class="text-4xl font-bold mb-2 mt-3">Information Collection</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We may collect the following personal information from our users:
        </p>
        <ul class="list-disc pl-5">
          <li class="lg:text-justify lg:text-[16px]">Name</li>
          <li class="lg:text-justify lg:text-[16px]">Phone number</li>
          <li class="lg:text-justify lg:text-[16px]">Email address</li>
          <li class="lg:text-justify lg:text-[16px]">
            Payment information (including credit card information)
          </li>
          <li class="lg:text-justify lg:text-[16px]">IP address</li>
          <li class="lg:text-justify lg:text-[16px]">Operating system</li>
          <li class="lg:text-justify lg:text-[16px]">
            Other information as per our registration process.
          </li>
        </ul>
        <p class="mt-4">
          We may collect this information when you register on our website, place an
          order, subscribe to our newsletter, fill out a form, or interact with our
          website in any other way.
        </p>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Information Use</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We will not use your personal and financial information for any purpose other
          than to complete a transaction with you. We will keep your information for as
          long as we are either required to by law or as is relevant for the purposes for
          which it was collected. We will only use your information where it is necessary
          and will only collect information if it is relevant to our dealings with you.
          Wherever it is possible, we will indicate which fields are required and which
          fields are optional.
        </p>
        <div class="text-2xl font-bold mb-2 mt-3">
          How is your information treated with third party users?
        </div>
        <p class="lg:text-justify lg:text-[16px] mt-2">
          ‘‘cookie’’ is a small piece of information stored by a web-server on a web
          browser so that it can be later read back from that browser. Cookies are useful
          for enabling the browser to remember information specific to a given user.
          Cookie technology will only be used to track non-personal information such as IP
          address, type of browser, operating system, and domain names to improve our
          site. Any personal information is not extracted in this process.
        </p>
        <p class="lg:text-justify lg:text-[16px] mt-2">
          We may use the personal information that we collect from our users in the
          following ways:
        </p>
        <ul class="list-disc pl-5">
          <li class="lg:text-justify lg:text-[16px]">To process and fulfil orders</li>
          <li class="lg:text-justify lg:text-[16px]">
            To personalize the user experience
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            To send periodic emails about our products and services
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            To improve our website and the products and services that we offer
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            To respond to customer inquiries and support requests
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            To prevent fraud and unauthorized transactions
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Information Sharing</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We may share your personal information with third parties in the following ways:
        </p>
        <ul class="list-disc pl-5">
          <li class="lg:text-justify lg:text-[16px]">
            With service providers that help us operate our website and fulfil orders
            (such as payment processors and shipping companies)
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            With marketing partners that help us promote our products and services
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            With government agencies or other companies if required by law or to protect
            our rights or property
          </li>
          <li class="lg:text-justify lg:text-[16px]">
            With other users if you post information on a public area of our website (such
            as a product review)
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Payment and Security</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We use industry-standard security measures to protect your personal information,
          including SSL encryption for all transactions. We do not store your payment
          information on our servers.
        </p>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Cookie Policy</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We use cookies and similar technologies to track user activity on our website
          and to personalize the user experience. By using our website, you consent to the
          use of cookies in accordance with our Cookie Policy.
        </p>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Opt-Out</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          If you would like to opt-out of receiving marketing communications from us, you
          can do so by clicking the “unsubscribe” link in any email that we send you.
        </p>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Contact Information</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          If you have any questions or concerns about this Privacy Policy, please contact
          us at help.fashtsaly@gmail.com.
        </p>
      </div>
      <!--  -->
      <div class="text-4xl font-bold mb-2 mt-3">Changes to This Policy</div>
      <div class="leading-7">
        <p class="lg:text-justify lg:text-[16px]">
          We reserve the right to make changes to this Privacy Policy at any time. Any
          changes will be posted on this page and will be effective immediately upon
          posting.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
