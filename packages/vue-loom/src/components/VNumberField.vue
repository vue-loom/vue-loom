<script setup lang="ts">
    import {NumberField} from "./ui/number-field";
    import {type NumberFieldRootEmits, type NumberFieldRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<NumberFieldRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <NumberField v-bind="forwarded">
        <slot/>
    </NumberField>
</template>

<style scoped>

</style>
