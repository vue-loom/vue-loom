<script setup lang="ts">
    import {AlertDescription} from "./ui/alert";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'], }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDescription v-bind="forwardedProps">
        <slot/>
    </AlertDescription>
</template>

<style scoped>

</style>
