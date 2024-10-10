<script setup lang="ts">
    import {CarouselItem} from "./ui/carousel";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CarouselItem v-bind="forwardedProps">
        <slot/>
    </CarouselItem>
</template>

<style scoped>

</style>
