<script setup lang="ts">
import {CommandGroup} from "./ui/command";
import type {ComboboxGroupProps} from "radix-vue";
import type {HTMLAttributes} from "vue";

const props = defineProps<ComboboxGroupProps & {
    class?: HTMLAttributes['class']
    heading?: string
}>();
</script>

<template>
<CommandGroup v-bind="props">
    <slot/>
</CommandGroup>
</template>

<style scoped>

</style>
