<script setup lang="ts">
    import {TableCell} from "./ui/table";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <TableCell v-bind="forwarded">
        <slot/>
    </TableCell>
</template>

<style scoped>

</style>
