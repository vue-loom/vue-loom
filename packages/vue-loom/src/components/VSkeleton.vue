<script setup lang="ts">
    import {Skeleton} from "./ui/skeleton";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <Skeleton v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
