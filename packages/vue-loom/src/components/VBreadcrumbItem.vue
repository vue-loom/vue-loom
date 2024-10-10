<script setup lang="ts">
    import {BreadcrumbItem} from "./ui/breadcrumb";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <BreadcrumbItem v-bind="forwardedProps">
        <slot/>
    </BreadcrumbItem>
</template>

<style scoped>

</style>
