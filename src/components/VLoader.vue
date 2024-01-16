<script setup lang="ts">
    import {resolveBorder, resolveBorderTop} from "@/partials/colors";
    import {computed, type ComputedRef, type StyleValue} from "vue";

    interface Props {
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        width?: 'sm' | 'md' | 'lg' | 'xl',
        size?: number | string,
        overlay?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'default',
        width: 'lg',
        size: 20,
        overlay: false,
    });

    const loaderGlobalSizeStyleObject: ComputedRef<StyleValue> = computed(() => ({
        width: `${props.size}px`,
        height: `${props.size}px`,
    }));

    const loaderGlobalClassObject: ComputedRef<object> = computed(() => ({
        'border': props.width === 'sm',
        'border-2': props.width === 'md',
        'border-4': props.width === 'lg',
        'border-8': props.width === 'xl',
    }));

    const loaderClassObject: ComputedRef<object> = computed(() => ({
        ...loaderGlobalClassObject.value,
        [`${resolveBorder(props.color)}`]: props.color !== 'default',
        'border-white': props.color === 'default',
    }));

    const loaderSectionClassObject: ComputedRef<object> = computed(() => ({
        ...loaderGlobalClassObject.value,
        [`${resolveBorderTop(props.color)}`]: props.color !== 'default',
        'border-t-white/70': props.color === 'default',
    }));
</script>

<template>
    <div>
        <div ref="dialogScreen"
             class="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center"
             @wheel.prevent
             @scroll.prevent
             v-if="overlay"
        >
            <div class="relative">
                <div class="relative rounded-full opacity-30"
                     :class="loaderClassObject"
                     :style="loaderGlobalSizeStyleObject"
                />
                <div
                    class="absolute top-0 left-0 rounded-full border-x-transparent border-b-transparent animate-spin opacity-70"
                    :class="loaderSectionClassObject"
                    :style="loaderGlobalSizeStyleObject"
                />
            </div>
        </div>
        <div class="relative" v-else>
            <div class="relative rounded-full opacity-30"
                 :class="loaderClassObject"
                 :style="loaderGlobalSizeStyleObject"
            />
            <div
                class="absolute top-0 left-0 rounded-full border-x-transparent border-b-transparent animate-spin opacity-70"
                :class="loaderSectionClassObject"
                :style="loaderGlobalSizeStyleObject"
            />
        </div>
    </div>
</template>

<style scoped>

</style>
