<script setup lang="ts">
    import {AlertTitle} from "./ui/alert";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertTitle v-bind="forwardedProps">
        <slot/>
    </AlertTitle>
</template>

<style scoped>

</style>
