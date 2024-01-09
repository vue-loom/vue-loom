<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import {resolveText} from "@/components/Partials/colors";
    import * as OutlineIcons from '@heroicons/vue/24/outline';
    import * as SolidIcons from '@heroicons/vue/24/solid';

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

    const iconString: ComputedRef<string> = computed(() => `${props.icon.split('-').map((part) => part.ucFirst()).join('')}Icon`);

    const IconComponent = computed(() => {
        if (!props.solid) {
            return OutlineIcons[iconString.value];
        } else {
            return SolidIcons[iconString.value];
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
    <IconComponent
        aria-disabled="true"
        :class="[iconSize, iconColor]"
        :style="{width: iconSizeStyle, height: iconSizeStyle}"
    />
</template>

<style scoped>

</style>
