<script setup lang="ts">
    import {DropdownMenuSeparator} from "./ui/dropdown-menu";
    import {type DropdownMenuSeparatorProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DropdownMenuSeparatorProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DropdownMenuSeparator v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
