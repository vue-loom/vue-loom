<script setup lang="ts">
import {CommandSeparator} from "./ui/command";
import type {ComboboxSeparatorProps} from "radix-vue";
import type {HTMLAttributes} from "vue";

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
<CommandSeparator v-bind="props">
    <slot/>
</CommandSeparator>
</template>

<style scoped>

</style>
