<script setup lang="ts">
    import {RadioGroupItem} from "./ui/radio-group";
    import {type RadioGroupItemProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <RadioGroupItem v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
