<script setup lang="ts">
    import {DropdownMenuLabel} from "./ui/dropdown-menu";
    import {type DropdownMenuLabelProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'], inset?: boolean }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DropdownMenuLabel v-bind="forwardedProps">
        <slot/>
    </DropdownMenuLabel>
</template>

<style scoped>

</style>
