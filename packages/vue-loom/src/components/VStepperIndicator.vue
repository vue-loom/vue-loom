<script setup lang="ts">
import {StepperIndicator} from "./ui/stepper";
import {type StepperIndicatorProps, useForwardProps} from "radix-vue";
import {computed, type HTMLAttributes} from "vue";

const props = defineProps<StepperIndicatorProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(props)
</script>

<template>
<StepperIndicator v-bind="forwarded">
    <slot/>
</StepperIndicator>
</template>

<style scoped>

</style>
