<script setup lang="ts">
import {CommandDialog} from "./ui/command";
import {type DialogRootEmits, type DialogRootProps, useForwardPropsEmits} from "radix-vue";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
<CommandDialog v-bind="forwarded">
    <slot/>
</CommandDialog>
</template>

<style scoped>

</style>
