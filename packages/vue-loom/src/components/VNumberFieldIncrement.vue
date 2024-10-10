<script setup lang="ts">
    import {NumberFieldIncrement} from "./ui/number-field";
    import {type NumberFieldIncrementProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <NumberFieldIncrement v-bind="forwarded">
        <slot/>
    </NumberFieldIncrement>
</template>

<style scoped>

</style>
