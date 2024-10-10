<script setup lang="ts">
import {ToastProvider} from "./ui/toast";
import type {ToastProviderProps} from "radix-vue";

const props = defineProps<ToastProviderProps>();
</script>

<template>
<ToastProvider v-bind="props">
    <slot/>
</ToastProvider>
</template>

<style scoped>

</style>
