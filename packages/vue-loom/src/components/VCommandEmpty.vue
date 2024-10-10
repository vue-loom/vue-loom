<script setup lang="ts">
    import {CommandEmpty} from "./ui/command";
    import type {ComboboxEmptyProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
    <CommandEmpty v-bind="props">
        <slot/>
    </CommandEmpty>
</template>

<style scoped>

</style>
