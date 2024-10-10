<script setup lang="ts">
    import {AlertDialogFooter} from "./ui/alert-dialog";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogFooter v-bind="forwardedProps">
        <slot/>
    </AlertDialogFooter>
</template>

<style scoped>

</style>
