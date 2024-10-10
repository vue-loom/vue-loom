<script setup lang="ts">
    import {StepperSeparator} from "./ui/stepper";
    import {type StepperSeparatorProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>()

    const forwarded = useForwardProps(props)
</script>

<template>
    <StepperSeparator v-bind="forwarded"/>
</template>

<style scoped>

</style>
