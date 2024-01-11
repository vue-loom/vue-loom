<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";

    interface Props {
        fullWidth?: boolean;
        maxWidth?: string;
        toolbarOffset?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        fullWidth: false,
        maxWidth: '7xl',
        toolbarOffset: false,
    });

    const widthClass: ComputedRef<string> = computed(() => {
        return {
            'xs': 'max-w-xs',
            'sm': 'max-w-sm',
            'md': 'max-w-md',
            'lg': 'max-w-lg',
            'xl': 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
            '7xl': 'max-w-7xl',
        }[props.maxWidth] || 'max-w-7xl';
    });
</script>

<template>
    <div class="mx-auto w-full px-3 sm:px-6 lg:px-8"
         :class="[widthClass, toolbarOffset ? 'pb-4 pt-20 sm:pb-8 sm:pt-24 lg:pb-10 lg:pt-[104px]' : 'py-4 sm:py-8 lg:py-10']"
    >
        <slot/>
    </div>
</template>

<style scoped>

</style>
