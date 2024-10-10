<script setup lang="ts">
    import {Avatar, type AvatarVariants} from "./ui/avatar";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    interface Props {
        class?: HTMLAttributes['class'],
        size?: AvatarVariants['size'],
        shape?: AvatarVariants['shape'],
    }

    const props = withDefaults(defineProps<Props>(), {
        size: 'sm',
        shape: 'circle',
    });

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <Avatar v-bind="forwardedProps">
        <slot/>
    </Avatar>
</template>

<style scoped>

</style>
