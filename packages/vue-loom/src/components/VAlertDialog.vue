<script setup lang="ts">
    import {AlertDialog, AlertDialogTrigger} from './ui/alert-dialog';
    import {type AlertDialogEmits, type AlertDialogProps, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<AlertDialogProps>();
    const emits = defineEmits<AlertDialogEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <AlertDialog v-bind="forwarded">
        <AlertDialogTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </AlertDialogTrigger>
        <slot/>
    </AlertDialog>
</template>

<style scoped>

</style>
