<script setup lang="ts">
    import {StepperTrigger} from "./ui/stepper";
    import {type StepperTriggerProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <StepperTrigger v-bind="forwarded">
        <slot/>
    </StepperTrigger>
</template>

<style scoped>

</style>
