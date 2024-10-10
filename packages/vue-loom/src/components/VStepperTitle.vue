<script setup lang="ts">
    import {StepperTitle} from "./ui/stepper";
    import {type StepperTitleProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<StepperTitleProps & { class?: HTMLAttributes['class'] }>()

    const forwarded = useForwardProps(props)
</script>

<template>
    <StepperTitle v-bind="forwarded">
        <slot/>
    </StepperTitle>
</template>

<style scoped>

</style>
