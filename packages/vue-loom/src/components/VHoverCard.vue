<script setup lang="ts">
    import {HoverCard, HoverCardTrigger} from "./ui/hover-card";
    import {type HoverCardRootEmits, type HoverCardRootProps, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<HoverCardRootProps>();
    const emits = defineEmits<HoverCardRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <HoverCard v-bind="forwarded">
        <HoverCardTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </HoverCardTrigger>
        <slot/>
    </HoverCard>
</template>

<style scoped>

</style>
