<script setup lang="ts">
    import {CarouselContent} from "./ui/carousel";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CarouselContent v-bind="forwardedProps">
        <slot/>
    </CarouselContent>
</template>

<style scoped>

</style>
