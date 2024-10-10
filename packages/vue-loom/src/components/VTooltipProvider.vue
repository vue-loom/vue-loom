<script setup lang="ts">
    import {TooltipProvider} from "./ui/tooltip";
    import {type TooltipProviderProps, useForwardProps} from "radix-vue";

    const props = defineProps<TooltipProviderProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <TooltipProvider v-bind="forwardedProps">
        <slot/>
    </TooltipProvider>
</template>

<style scoped>

</style>
