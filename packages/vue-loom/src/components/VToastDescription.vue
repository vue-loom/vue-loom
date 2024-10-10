<script setup lang="ts">
    import {ToastDescription} from "./ui/toast";
    import type {ToastDescriptionProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
    <ToastDescription v-bind="props">
        <slot/>
    </ToastDescription>
</template>

<style scoped>

</style>
