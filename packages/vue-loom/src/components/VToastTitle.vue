<script setup lang="ts">
    import {ToastTitle} from "./ui/toast";
    import type {ToastTitleProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
    <ToastTitle v-bind="props">
        <slot/>
    </ToastTitle>
</template>

<style scoped>

</style>
