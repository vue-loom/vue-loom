<script setup lang="ts">
    import {TableHead} from "./ui/table";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <TableHead v-bind="forwarded">
        <slot/>
    </TableHead>
</template>

<style scoped>

</style>
