<script setup lang="ts">
    import {TableHeader, TableRow} from "./ui/table";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <TableHeader v-bind="forwarded">
        <TableRow>
            <slot/>
        </TableRow>
    </TableHeader>
</template>

<style scoped>

</style>
