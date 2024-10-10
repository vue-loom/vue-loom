<script setup lang="ts">
    import {NavigationMenuContent} from "./ui/navigation-menu";
    import {type NavigationMenuContentEmits, type NavigationMenuContentProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NavigationMenuContentProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<NavigationMenuContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <NavigationMenuContent v-bind="forwarded">
        <slot/>
    </NavigationMenuContent>
</template>

<style scoped>

</style>
