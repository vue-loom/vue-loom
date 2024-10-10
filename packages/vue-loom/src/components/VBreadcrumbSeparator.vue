<script setup lang="ts">
    import {BreadcrumbSeparator} from "./ui/breadcrumb";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <BreadcrumbSeparator v-bind="forwardedProps">
        <slot/>
    </BreadcrumbSeparator>
</template>

<style scoped>

</style>
