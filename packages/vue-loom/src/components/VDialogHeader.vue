<script setup lang="ts">
    import {DialogHeader} from "./ui/dialog";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DialogHeader v-bind="forwardedProps">
        <slot/>
    </DialogHeader>
</template>

<style scoped>

</style>
