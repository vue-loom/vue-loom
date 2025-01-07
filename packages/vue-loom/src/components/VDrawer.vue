<script setup lang="ts">
    import {Drawer} from "./ui/drawer";
    import {type DrawerRootEmits, type DrawerRootProps} from "vaul-vue";
    import {useForwardPropsEmits} from "radix-vue";

    const props = withDefaults(defineProps<DrawerRootProps>(), {
        shouldScaleBackground: true,
    });

    const emits = defineEmits<DrawerRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Drawer v-bind="forwarded">
        <slot/>
    </Drawer>
</template>

<style scoped>

</style>