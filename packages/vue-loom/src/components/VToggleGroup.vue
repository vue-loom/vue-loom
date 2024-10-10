<script setup lang="ts">
    import {ToggleGroup} from "./ui/toggle-group";
    import type {VariantProps} from "class-variance-authority";
    import type {toggleVariants} from "./ui/toggle";
    import {type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits} from "radix-vue";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";

    type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

    interface Props extends ToggleGroupRootProps {
        class?: HTMLAttributes['class'],
        variant?: ToggleGroupVariants['variant'],
        size?: ToggleGroupVariants['size'],
    }

    const props = withDefaults(defineProps<Props>(), {
        type: 'single',
    });

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const emits = defineEmits<ToggleGroupRootEmits>();

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <ToggleGroup :class="[cn('w-fit', props.class)]" v-bind="forwarded">
        <slot/>
    </ToggleGroup>
</template>

<style scoped>

</style>
