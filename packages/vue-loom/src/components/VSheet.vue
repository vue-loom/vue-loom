<script setup lang="ts">
    import {Sheet, SheetTrigger} from './ui/sheet';
    import {type DialogRootEmits, type DialogRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DialogRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<DialogRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Sheet v-bind="forwarded">
        <SheetTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </SheetTrigger>
        <slot/>
    </Sheet>
</template>

<style scoped>

</style>
