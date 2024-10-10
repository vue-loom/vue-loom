<script setup lang="ts">
    import {AccordionItem, AccordionTrigger} from "./ui/accordion";
    import {type AccordionItemProps, useForwardProps} from "radix-vue";

    const props = defineProps<AccordionItemProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AccordionItem v-bind="forwardedProps">
        <AccordionTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </AccordionTrigger>
        <slot/>
    </AccordionItem>
</template>

<style scoped>

</style>
