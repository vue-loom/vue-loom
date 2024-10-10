<script setup lang="ts">
    import {CollapsibleContent} from "./ui/collapsible";
    import {type CollapsibleContentProps, useForwardProps} from "radix-vue";

    const props = defineProps<CollapsibleContentProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CollapsibleContent v-bind="forwardedProps">
        <slot/>
    </CollapsibleContent>
</template>

<style scoped>

</style>
