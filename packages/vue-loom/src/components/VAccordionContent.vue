<script setup lang="ts">
    import {AccordionContent} from "./ui/accordion";
    import {type AccordionContentProps, useForwardProps} from "radix-vue";

    const props = defineProps<AccordionContentProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AccordionContent v-bind="forwardedProps">
        <slot/>
    </AccordionContent>
</template>

<style scoped>

</style>
