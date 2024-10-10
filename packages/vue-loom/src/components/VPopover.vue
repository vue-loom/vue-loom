<script setup lang="ts">
    import {useForwardPropsEmits} from 'radix-vue';
    import type {PopoverRootEmits, PopoverRootProps} from 'radix-vue';
    import {Popover, PopoverTrigger} from "./ui/popover";

    const props = defineProps<PopoverRootProps>();
    const emits = defineEmits<PopoverRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Popover v-bind="forwarded">
        <PopoverTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </PopoverTrigger>
        <slot/>
    </Popover>
</template>
