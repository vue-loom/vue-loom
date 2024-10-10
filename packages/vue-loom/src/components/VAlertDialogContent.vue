<script setup lang="ts">
    import {AlertDialogContent} from './ui/alert-dialog';
    import {type AlertDialogContentEmits, type AlertDialogContentProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<AlertDialogContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <AlertDialogContent v-bind="forwarded">
        <slot/>
    </AlertDialogContent>
</template>

<style scoped>

</style>
