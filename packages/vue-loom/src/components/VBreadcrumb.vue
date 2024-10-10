<script setup lang="ts">
    import {Breadcrumb} from "./ui/breadcrumb";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <Breadcrumb v-bind="forwardedProps">
        <slot/>
    </Breadcrumb>
</template>

<style scoped>

</style>
