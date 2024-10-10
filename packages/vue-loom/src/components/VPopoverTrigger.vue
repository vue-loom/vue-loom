<script setup lang="ts">
    import {PopoverTrigger} from "./ui/popover";
    import type {PopoverTriggerProps} from "radix-vue";

    const props = defineProps<PopoverTriggerProps>()
</script>

<template>
    <PopoverTrigger v-bind="props">
        <slot/>
    </PopoverTrigger>
</template>

<style scoped>

</style>
