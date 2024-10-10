<script setup lang="ts">
    import {DropdownMenu, DropdownMenuSubTrigger} from './ui/dropdown-menu';
    import {type DropdownMenuRootEmits, type DropdownMenuRootProps, useForwardPropsEmits} from "radix-vue";
    import {computed} from "vue";

    const modelValue = defineModel<boolean>({default: false});
    const props = defineProps<DropdownMenuRootProps & { modelValue?: boolean }>();

    const delegatedProps = computed(() => {
        const {modelValue, ...delegated} = props;

        return delegated;
    });

    const emits = defineEmits<DropdownMenuRootEmits>();

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DropdownMenu v-bind="forwarded" v-model:open="modelValue">
        <DropdownMenuSubTrigger as-child v-if="!!$slots.trigger">
            <slot name="trigger"/>
        </DropdownMenuSubTrigger>
        <slot/>
    </DropdownMenu>
</template>

<style scoped>

</style>
