<script setup lang="ts">
    import {AccordionTrigger} from "./ui/accordion";
    import {type AccordionTriggerProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AccordionTrigger v-bind="forwardedProps">
        <slot/>
    </AccordionTrigger>
</template>

<style scoped>

</style>
