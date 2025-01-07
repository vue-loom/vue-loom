<script setup lang="ts">
    import {DrawerTrigger} from "./ui/drawer";
    import {useForwardProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";
    import {type DrawerTriggerProps} from "vaul-vue";

    const props = defineProps<DrawerTriggerProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DrawerTrigger v-bind="forwardedProps">
        <slot/>
    </DrawerTrigger>
</template>

<style scoped>

</style>