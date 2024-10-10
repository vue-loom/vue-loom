<script setup lang="ts">
    import {CarouselNext} from "./ui/carousel";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CarouselNext v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
