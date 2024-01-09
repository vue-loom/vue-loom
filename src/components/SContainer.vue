<script setup lang="ts">
    import {computed} from "vue";

    const props = defineProps({
        fullWidth: Boolean,
        maxWidth: {
            type: String,
            default: '7xl',
        },
    });

    const widthClass = computed(() => {
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
        }[props.maxWidth];
    });
</script>

<template>
    <div class="mx-auto w-full px-3 py-4 sm:py-8 lg:py-10 sm:px-6 lg:px-8" :class="[widthClass]">
        <slot/>
    </div>
</template>

<style scoped>

</style>
