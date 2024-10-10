<script setup lang="ts">
    import {Alert, type AlertVariants} from "./ui/alert";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'], variant?: AlertVariants['variant']}>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <Alert v-bind="forwardedProps">
        <slot/>
    </Alert>
</template>

<style scoped>

</style>
