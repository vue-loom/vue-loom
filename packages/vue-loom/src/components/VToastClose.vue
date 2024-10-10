<script setup lang="ts">
    import {ToastClose} from "./ui/toast";
    import type {ToastCloseProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<ToastCloseProps & {
        class?: HTMLAttributes['class']
    }>();
</script>

<template>
    <ToastClose v-bind="props"/>
</template>

<style scoped>

</style>
