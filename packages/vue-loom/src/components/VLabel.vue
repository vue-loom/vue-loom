<script setup lang="ts">
    import Label from "./ui/label/Label.vue";
    import {type LabelProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <Label v-bind="forwardedProps">
        <slot></slot>
    </Label>
</template>

<style scoped>

</style>
