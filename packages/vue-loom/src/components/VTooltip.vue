<script setup lang="ts">
    import {Tooltip, TooltipTrigger} from "./ui/tooltip";
    import {type TooltipRootEmits, type TooltipRootProps, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<TooltipRootProps>();
    const emits = defineEmits<TooltipRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Tooltip v-bind="forwarded">
        <TooltipTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </TooltipTrigger>
        <slot/>
    </Tooltip>
</template>

<style scoped>

</style>
