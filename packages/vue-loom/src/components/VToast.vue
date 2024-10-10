<script setup lang="ts">
    import {Toast, type ToastProps} from "./ui/toast";
    import {type ToastRootEmits, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<ToastProps>()

    const emits = defineEmits<ToastRootEmits>()

    const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
<Toast v-bind="forwarded">
    <slot/>
</Toast>
</template>

<style scoped>

</style>
