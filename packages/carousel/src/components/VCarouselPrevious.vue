<script setup lang="ts">
    import {CarouselPrevious} from "./ui/carousel";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CarouselPrevious v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
