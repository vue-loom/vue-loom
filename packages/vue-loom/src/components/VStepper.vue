<script setup lang="ts">
    import {Stepper} from "./ui/stepper";
    import {type StepperRootEmits, type StepperRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<StepperRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<StepperRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Stepper v-slot="slotProps" v-bind="forwarded">
        <slot v-bind="slotProps"/>
    </Stepper>
</template>

<style scoped>

</style>
