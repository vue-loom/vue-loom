<script setup lang="ts">
    import {AvatarImage} from "./ui/avatar";
    import {type AvatarImageProps, useForwardProps} from "radix-vue";

    const props = defineProps<AvatarImageProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AvatarImage v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
