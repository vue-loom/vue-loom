<script setup lang="ts">
    import {TableRow} from "./ui/table";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <TableRow v-bind="forwarded">
        <slot/>
    </TableRow>
</template>

<style scoped>

</style>
