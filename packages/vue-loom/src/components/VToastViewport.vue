<script setup lang="ts">
    import {ToastViewport} from "./ui/toast";
    import type {ToastViewportProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
    <ToastViewport v-bind="props"/>
</template>

<style scoped>

</style>
