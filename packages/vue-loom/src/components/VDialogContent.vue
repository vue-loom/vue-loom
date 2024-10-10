<script setup lang="ts">
    import {DialogContent} from './ui/dialog';
    import {type DialogContentEmits, type DialogContentProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<DialogContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <DialogContent v-bind="forwarded">
        <slot/>
    </DialogContent>
</template>

<style scoped>

</style>
