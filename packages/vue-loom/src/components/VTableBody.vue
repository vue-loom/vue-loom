<script setup lang="ts">
    import {TableBody} from "./ui/table";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <TableBody v-bind="forwarded">
        <slot/>
    </TableBody>
</template>

<style scoped>

</style>
