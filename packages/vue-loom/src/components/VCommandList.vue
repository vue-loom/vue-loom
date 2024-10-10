<script setup lang="ts">
    import {CommandList} from "./ui/command";
    import {type ComboboxContentEmits, type ComboboxContentProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>();

    const emits = defineEmits<ComboboxContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <CommandList v-bind="forwarded">
        <slot/>
    </CommandList>
</template>

<style scoped>

</style>
