<script setup lang="ts">
import {CommandInput} from "./ui/command";
import {type ComboboxInputProps, useForwardProps} from "radix-vue";
import {type HTMLAttributes} from "vue";
import {cn} from "../lib/utils";

const props = defineProps<ComboboxInputProps & {
    class?: HTMLAttributes['class']
}>();

const forwardedProps = useForwardProps(props)
</script>

<template>
<CommandInput :class="cn('border-none focus-visible:ring-offset-0 focus-visible:ring-0')" v-bind="forwardedProps">
    <slot/>
</CommandInput>
</template>

<style scoped>

</style>
