<script setup lang="ts">
    import {computed, type ComputedRef, type Ref, ref, onMounted, onUnmounted} from "vue";
    import {usePosition} from "@/composables/position";

    interface Props {
        align?: 'left' | 'right' | 'center',
        width?: string | 'w-full',
        position?: 'bottom' | 'top' | 'left' | 'right',
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        contentClasses?: string[],
    }

    const props = withDefaults(defineProps<Props>(), {
        align: 'center',
        width: '',
        position: 'bottom',
        color: '',
        contentClasses: () => [],
    });

    const tooltipState: Ref<boolean> = ref(false)
    const tooltip: Ref<HTMLElement | null> = ref(null);
    const triggerContainer: Ref<HTMLElement | null> = ref(null);

    const showTooltip = () => {
        tooltipState.value = true;
        usePosition(props.position, props.align, props.width, tooltip, triggerContainer);
    }

    const hideTooltip = () => {
        tooltipState.value = false;
    }

    onMounted(() => {
        document.addEventListener('scroll', hideTooltip);
    });

    onUnmounted(() => {
        document.removeEventListener('scroll', hideTooltip)
    });

    const alignmentClasses: ComputedRef<object> = computed(() => ({
        'origin-top-left': props.align === 'left',
        'origin-top-right': props.align === 'right',
        'origin-top': !props.align,
        'mb-1': props.position === 'top',
        'mt-1': props.position === 'bottom',
        'ml-1': props.position === 'right',
        'mr-1': props.position === 'left',
    }));

</script>

<template>
    <div>
        <div ref="triggerContainer" @mouseenter="showTooltip()" @mouseleave="hideTooltip()">
            <slot name="trigger"/>
        </div>
        <transition
            enter-active-class="transition-all duration-150"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                ref="tooltip"
                v-if="tooltipState"
                class="fixed z-40 flex justify-center items-center text-white text-sm shadow-lg bg-gray-600 p-2 rounded-lg"
                :class="[width !== 'w-full' ? width : '', alignmentClasses, contentClasses]"
            >
                <slot name="content"/>
            </div>
        </transition>
    </div>
</template>

<style scoped>

</style>
