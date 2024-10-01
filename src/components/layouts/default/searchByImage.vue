<script scoped>
const searchByImageStore = useSearchByImageStore();
const image = ref(null);
const imageRef = ref(null);
const callSearchByImage = async (event) => {
  console.log("here");
  const image = image.value;
  const name = ref("");
  searchByImageStore.fetchSearchByImage();
  const file = event.files[0];
  const reader = new FileReader();
  const blob = await fetch(file.objectURL).then((r) => r.blob()); // blob:url
  console.log(event.files);
  reader.readAsDataURL(blob);
  reader.onloadend(() => {
    image.value = reader.result;
    name.value = file.name;
  });
  searchByImageStore.fetchSearchByImage({ image: image.value, name: name.value });
};

onMounted(() => {
  console.log("111111", 111111);
});
</script>
<template>
  <div class="searchByImage w-fit relative flex items-center">
    <input
      onChange="callSearchByImage()"
      type="file"
      class="absolute w-[40px] h-[40px] opacity-0 cursor-pointer"
    />
    <i class="pi pi-camera text-gray-600 text-4xl cursor-pointer"></i>
  </div>
</template>
<style lang="scss"></style>
