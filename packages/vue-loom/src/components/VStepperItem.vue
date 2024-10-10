<script setup lang="ts">
    import {StepperItem, StepperTrigger} from "./ui/stepper";
    import {type StepperItemProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<StepperItemProps & { class?: HTMLAttributes['class'], step: number }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <StepperItem v-slot="slotProps" v-bind="forwarded" :step="step">
        <StepperTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </StepperTrigger>
        <slot v-bind="slotProps"/>
    </StepperItem>
</template>

<style scoped>

</style>
