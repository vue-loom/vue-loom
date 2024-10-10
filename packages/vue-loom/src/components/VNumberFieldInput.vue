<script setup lang="ts">
    import {NumberFieldInput} from "./ui/number-field";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <NumberFieldInput v-bind="forwardedProps">
        <slot/>
    </NumberFieldInput>
</template>

<style scoped>

</style>
