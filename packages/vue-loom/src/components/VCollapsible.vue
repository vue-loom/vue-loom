<script setup lang="ts">
    import {Collapsible, CollapsibleTrigger} from './ui/collapsible'
    import {type CollapsibleRootEmits, type CollapsibleRootProps, useForwardPropsEmits} from "radix-vue";

    const modelValue = defineModel<boolean>({default: false});
    const props = defineProps<CollapsibleRootProps>();
    const emits = defineEmits<CollapsibleRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Collapsible v-bind="forwarded" v-model:open="modelValue">
        <CollapsibleTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </CollapsibleTrigger>
        <slot/>
    </Collapsible>
</template>

<style scoped>

</style>
