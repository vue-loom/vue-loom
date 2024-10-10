<script setup lang="ts">
    import {ToggleGroupItem} from "./ui/toggle-group";
    import type {VariantProps} from "class-variance-authority";
    import {toggleVariants} from "./ui/toggle";
    import {type ToggleGroupItemProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

    interface Props extends ToggleGroupItemProps {
        class?: HTMLAttributes['class'],
        variant?: ToggleGroupVariants['variant'],
        size?: ToggleGroupVariants['size'],
    }

    const props = defineProps<Props>();
    const forwardedProps = useForwardProps(props);
</script>

<template>
    <ToggleGroupItem v-bind="forwardedProps">
        <slot/>
    </ToggleGroupItem>
</template>

<style scoped>

</style>
