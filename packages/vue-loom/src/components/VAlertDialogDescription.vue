<script setup lang="ts">
    import {AlertDialogDescription} from './ui/alert-dialog';
    import {type AlertDialogDescriptionProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogDescription v-bind="forwardedProps">
        <slot/>
    </AlertDialogDescription>
</template>

<style scoped>

</style>
