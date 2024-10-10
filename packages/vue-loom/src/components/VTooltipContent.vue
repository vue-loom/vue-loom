<script setup lang="ts">
    import {TooltipContent} from "./ui/tooltip";
    import {type TooltipContentProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(), {
        side: 'top',
        align: 'center',
        alignOffset: 0,
        sideOffset: 4,
        avoidCollisions: false,
        collisionBoundary: null,
        collisionPadding: 0,
        arrowPadding: 0,
        sticky: 'partial',
        hideWhenDetached: false,
    });

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <TooltipContent v-bind="forwardedProps">
        <slot/>
    </TooltipContent>
</template>

<style scoped>

</style>
