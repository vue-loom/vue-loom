<script setup lang="ts">
    import {type HTMLAttributes} from 'vue'
    import {
        type PopoverContentEmits,
        type PopoverContentProps,
        useForwardPropsEmits,
    } from 'radix-vue';
    import {PopoverContent} from "./ui/popover";

    const props = defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>();

    const emits = defineEmits<PopoverContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <PopoverContent v-bind="forwarded">
        <slot/>
    </PopoverContent>
</template>

<style scoped>

</style>
