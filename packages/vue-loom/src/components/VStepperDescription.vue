<script setup lang="ts">
import {StepperDescription} from "./ui/stepper";
import {type StepperDescriptionProps, useForwardProps} from "radix-vue";
import {type HTMLAttributes} from "vue";

const props = defineProps<StepperDescriptionProps & { class?: HTMLAttributes['class'] }>();

const forwarded = useForwardProps(props);
</script>

<template>
<StepperDescription v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps"/>
</StepperDescription>
</template>

<style scoped>

</style>
