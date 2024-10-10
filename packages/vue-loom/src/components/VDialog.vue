<script setup lang="ts">
    import {Dialog, DialogTrigger} from './ui/dialog';
    import {type DialogRootEmits, type DialogRootProps, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<DialogRootProps>();
    const emits = defineEmits<DialogRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Dialog v-bind="forwarded">
        <DialogTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </DialogTrigger>
        <slot/>
    </Dialog>
</template>

<style scoped>

</style>
