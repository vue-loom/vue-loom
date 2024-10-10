<script setup lang="ts">
    import {Carousel} from "./ui/carousel";
    import {useForwardProps} from "radix-vue";
    import type {CarouselProps, WithClassAsProps} from "./ui/carousel/interface";

    const props = defineProps<CarouselProps & WithClassAsProps>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <Carousel v-bind="forwarded">
        <slot/>
    </Carousel>
</template>

<style scoped>

</style>
