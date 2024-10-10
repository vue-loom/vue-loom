<script setup lang="ts">
import {ToastAction} from "./ui/toast";
import type {ToastActionProps} from "radix-vue";
import {type HTMLAttributes} from "vue";

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
<ToastAction v-bind="props">
    <slot/>
</ToastAction>
</template>

<style scoped>

</style>
