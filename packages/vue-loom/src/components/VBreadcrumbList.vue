<script setup lang="ts">
    import {BreadcrumbList} from "./ui/breadcrumb";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <BreadcrumbList v-bind="forwardedProps">
        <slot/>
    </BreadcrumbList>
</template>

<style scoped>

</style>
