<script setup>
const searchByImageStore = useSearchByImageStore();
const image = ref(null);
const name = ref('');
const loading = ref(false);
const emit = defineEmits(['loading' , 'stoploading' , 'result']);
const callSearchByImage = async (event) => {
  loading.value = true;
  emit('loading');  
  const file = event.target.files[0];
  const reader = new FileReader();

  const objectURL = URL.createObjectURL(file);
  
  const blob = await fetch(objectURL).then((r) => r.blob()); 

  reader.readAsDataURL(blob); 
  reader.onload = async () => {  
    image.value = reader.result;
    name.value = file.name;
    const result = await searchByImageStore.fetchSearchByImage({ image: image.value, name: name.value });
    loading.value = false;
    emit('stoploading');
    emit('result' , result);
  };
};
</script>
<template>
  <div class="searchByImage w-fit relative flex items-center">
    <input
      @change="callSearchByImage"
      type="file"
      class="absolute w-[40px] h-[40px] opacity-0 cursor-pointer"
    />
    <i class="pi pi-camera text-gray-600 text-4xl cursor-pointer"></i>
  </div>
</template>
<style lang="scss"></style>
