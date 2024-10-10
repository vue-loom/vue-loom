<script setup lang="ts">
    import {AspectRatio} from "./ui/aspect-ratio";
    import {type AspectRatioProps, useForwardProps} from "radix-vue";

    const props = defineProps<AspectRatioProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AspectRatio v-bind="forwardedProps">
        <slot/>
    </AspectRatio>
</template>

<style scoped>

</style>
