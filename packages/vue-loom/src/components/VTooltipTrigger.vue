<script setup lang="ts">
    import {TooltipTrigger} from "./ui/tooltip";
    import {type TooltipTriggerProps, useForwardProps} from "radix-vue";

    const props = defineProps<TooltipTriggerProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <TooltipTrigger v-bind="forwardedProps">
        <slot/>
    </TooltipTrigger>
</template>

<style scoped>

</style>
