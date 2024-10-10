<script setup lang="ts">
    import {Toggle, type ToggleVariants} from './ui/toggle';
    import {type ToggleEmits, type ToggleProps, useForwardPropsEmits} from "radix-vue";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";

    interface Props extends ToggleProps {
        class?: HTMLAttributes['class'],
        variant?: ToggleVariants['variant'],
        size?: ToggleVariants['size'],
    }

    const props = withDefaults(defineProps<Props>(), {
        variant: 'default',
        size: 'default',
        disabled: false,
    });

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const emits = defineEmits<ToggleEmits>();

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <Toggle :class="[cn('w-fit', props.class)]" v-bind="forwarded">
        <slot/>
    </Toggle>
</template>

<style scoped>

</style>
