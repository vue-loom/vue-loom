<script setup lang="ts">
    import {HoverCardContent} from "./ui/hover-card";
    import {type HoverCardContentProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<HoverCardContentProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <HoverCardContent v-bind="forwardedProps">
        <slot/>
    </HoverCardContent>
</template>

<style scoped>

</style>
