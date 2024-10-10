<script setup lang="ts">
    import {BreadcrumbLink} from "./ui/breadcrumb";
    import {useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    interface Props {
        as?: string,
        asChild?: boolean,
        class?: HTMLAttributes['class'],
    }

    const props = defineProps<Props>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <BreadcrumbLink v-bind="forwardedProps">
        <slot/>
    </BreadcrumbLink>
</template>

<style scoped>

</style>
