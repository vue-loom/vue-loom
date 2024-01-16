<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import {resolveBg} from "@/partials/colors";

    interface Props {
        vertical?: boolean;
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | string;
        thickness?: 'sm' | 'md' | 'lg' | 'xl' | null;
    }

    const parsedColor: ComputedRef<string> = computed(
        () => ['primary', 'secondary', 'accent', 'success', 'warning', 'danger'].includes(props.color) ? resolveBg(props.color) : props.color);

    const parsedThickness: ComputedRef<string> = computed(() => {
        if (props.vertical) {
            switch (props.thickness) {
                case 'sm':
                    return 'w-1';
                case 'md':
                    return 'w-2';
                case 'lg':
                    return 'w-4';
                case 'xl':
                    return 'w-8';
                default:
                    return 'w-px';
            }
        } else {
            switch (props.thickness) {
                case 'sm':
                    return 'h-1';
                case 'md':
                    return 'h-2';
                case 'lg':
                    return 'h-4';
                case 'xl':
                    return 'h-8';
                default:
                    return 'h-px';
            }
        }
    });

    const props = withDefaults(defineProps<Props>(), {
        vertical: false,
        color: 'bg-gray-300',
        thickness: null,
    });

    const dividerClassObject: ComputedRef<object> = computed(() => ({
        'h-full': props.vertical,
        'w-full': !props.vertical,
        [parsedColor.value]: true,
        [parsedThickness.value]: true,
    }));
</script>

<template>
    <div :class="dividerClassObject"></div>
</template>

<style scoped>

</style>