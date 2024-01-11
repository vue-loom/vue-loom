<script setup lang="ts">
    import {type Component, computed, type ComputedRef} from "vue";
    import {resolveText} from "@/partials/colors";
    import * as OutlineIcons from '@heroicons/vue/24/outline';
    import * as SolidIcons from '@heroicons/vue/24/solid';
    import { ucFirst } from '@/partials/prototypes';

    interface Props {
        icon: string;
        size?: number | string | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
        solid?: boolean;
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
    }

    const props = withDefaults(defineProps<Props>(), {
        icon: '',
        size: 'sm',
        solid: false,
        color: 'gray-500',
    });

    const iconString: ComputedRef<string> = computed(() => `${props.icon.split('-')
        .map((part) => ucFirst(part))
        .join('')}Icon`);

    const iconComponent: ComputedRef<Component> = computed(() => {
        if (!props.solid) {
            return OutlineIcons[iconString.value as keyof typeof OutlineIcons];
        } else {
            return SolidIcons[iconString.value as keyof typeof SolidIcons];
        }
    });

    const iconSize: ComputedRef<string> = computed(() => {
        switch (props.size) {
            case 'xs':
                return 'w-3 h-3';
            case 'sm':
                return 'w-5 h-5';
            case 'md':
                return 'w-8 h-8';
            case 'lg':
                return 'w-14 h-14';
            case 'xl':
                return 'w-20 h-20';
            default:
                return '';
        }
    });

    const iconSizeStyle: ComputedRef<string> = computed(() => {
        if (iconSize.value === '') {
            return `${props.size}px`
        }

        return '';
    });

    const iconColor: ComputedRef<string> = computed(() => {
        if (!['primary', 'secondary', 'accent', 'success', 'warning', 'danger'].includes(props.color)) {
            return `text-${props.color}`;
        }

        return resolveText(props.color);
    });
</script>

<template>
    <component
        aria-disabled="true"
        :is="iconComponent"
        :class="[iconSize, iconColor]"
        :style="{width: iconSizeStyle, height: iconSizeStyle}"
    />
</template>

<style scoped>

</style>
