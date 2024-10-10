<script setup lang="ts">
    import {CommandItem} from "./ui/command";
    import {type ComboboxItemEmits, type ComboboxItemProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] } & {value: any}>()
    const emits = defineEmits<ComboboxItemEmits>()

    const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
    <CommandItem v-bind="forwarded" :value="props.value">
        <slot/>
    </CommandItem>
</template>

<style scoped>

</style>
