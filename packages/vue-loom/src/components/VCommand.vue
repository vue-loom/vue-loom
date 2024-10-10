<script setup lang="ts">
    import {Command} from "./ui/command";
    import {type ComboboxRootEmits, type ComboboxRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>();

    const emits = defineEmits<ComboboxRootEmits>()

    const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <Command v-bind="forwarded">
        <slot/>
    </Command>
</template>

<style scoped>

</style>
