<script setup lang="ts">
    import {AlertDialogAction} from './ui/alert-dialog';
    import {type AlertDialogActionProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogAction v-bind="forwardedProps">
        <slot/>
    </AlertDialogAction>
</template>

<style scoped>

</style>
