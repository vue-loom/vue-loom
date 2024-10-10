<script setup lang="ts">
    import {AvatarFallback} from "./ui/avatar";
    import {type AvatarFallbackProps, useForwardProps} from "radix-vue";

    const props = defineProps<AvatarFallbackProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AvatarFallback v-bind="forwardedProps">
        <slot/>
    </AvatarFallback>
</template>

<style scoped>

</style>
