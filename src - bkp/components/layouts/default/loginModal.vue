<script setup lang="ts">

import Password from 'primevue/password';
const props = defineProps<{
    visible: boolean;
    close: () => void;
}>();

const value = ref(null);

</script>

<template>
    <Dialog :visible="visible" modal header="Enter Your Details" :style="{ width: '25rem' }">

        <div class="flex items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">Email</label>
            <input type="email" class="py-2 px-2 rounded border-gray-400 border w-[80%]" autocomplete="off"
                placeholder="Enter Email" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="password" class="font-semibold w-24">Password</label>
            <input class="py-2 px-2 rounded border-gray-400 border w-[80%]" autocomplete="off" type="password"
                placeholder="Enter Password" />
            <!-- <InputText type="password" id="password" class="flex-auto" autocomplete="off" /> -->
        </div>
        <p class="text-center mb-4">Don't have an account? <a href="../signup" style="color: var(--primary);">Register</a>
        </p>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="close"></Button>
            <Button type="button" label="Login" @click="visible = false"></Button>
        </div>
    </Dialog>
</template>

<style lang="scss">
input {
    font-size: 16px;
}

.p-dialog .p-dialog-header .p-dialog-title {
    font-size: 25px;
    text-align: center;
    display: block;
}

.p-button {
    background: var(--primary);
    border: 0;
}

.p-button:enabled:hover {
    opacity: 0.8;
    background-color: var(--primary);

}

.p-dialog-header-icon {
    display: none;
}
</style>