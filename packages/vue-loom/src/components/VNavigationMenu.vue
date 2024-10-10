<script setup lang="ts">
    import {NavigationMenu} from "./ui/navigation-menu";
    import {type NavigationMenuRootEmits, type NavigationMenuRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<NavigationMenuRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <NavigationMenu v-bind="forwarded">
        <slot/>
    </NavigationMenu>
</template>

<style scoped>

</style>
