<script setup lang="ts">
import {CommandShortcut} from "./ui/command";
import type {HTMLAttributes} from "vue";

const props = defineProps<{
    class?: HTMLAttributes['class']
}>();
</script>

<template>
<CommandShortcut v-bind="props">
    <slot/>
</CommandShortcut>
</template>

<style scoped>

</style>
