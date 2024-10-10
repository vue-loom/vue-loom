<script setup lang="ts">
    import {BreadcrumbPage} from "./ui/breadcrumb";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <BreadcrumbPage v-bind="forwardedProps">
        <slot/>
    </BreadcrumbPage>
</template>

<style scoped>

</style>
