<script setup lang="ts">
    import {TableCaption} from "./ui/table";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <TableCaption v-bind="forwarded">
        <slot/>
    </TableCaption>
</template>

<style scoped>

</style>
