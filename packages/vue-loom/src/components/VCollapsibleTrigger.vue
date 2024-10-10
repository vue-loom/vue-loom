<script setup lang="ts">
    import {CollapsibleTrigger} from "./ui/collapsible";
    import {type CollapsibleTriggerProps, useForwardProps} from "radix-vue";

    const props = defineProps<CollapsibleTriggerProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CollapsibleTrigger v-bind="forwardedProps">
        <slot/>
    </CollapsibleTrigger>
</template>

<style scoped>

</style>
