<script setup lang="ts">
    import {DropdownMenuTrigger} from './ui/dropdown-menu';
    import {type DropdownMenuTriggerProps, useForwardProps} from "radix-vue";

    const props = defineProps<DropdownMenuTriggerProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DropdownMenuTrigger v-bind="forwardedProps">
        <slot/>
    </DropdownMenuTrigger>
</template>

<style scoped>

</style>
