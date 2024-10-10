<script setup lang="ts">
    import {NumberFieldDecrement} from "./ui/number-field";
    import {type NumberFieldDecrementProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <NumberFieldDecrement v-bind="forwarded">
        <slot/>
    </NumberFieldDecrement>
</template>

<style scoped>

</style>
