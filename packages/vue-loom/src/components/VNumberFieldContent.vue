<script setup lang="ts">
    import {NumberFieldContent} from "./ui/number-field";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <NumberFieldContent v-bind="forwardedProps">
        <slot/>
    </NumberFieldContent>
</template>

<style scoped>

</style>
