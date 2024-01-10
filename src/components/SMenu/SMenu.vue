<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, onUnmounted, type Ref, ref, watch} from 'vue';
    import {useClick, usePosition} from "@/components/Composables/position";

    interface Props {
        modelValue?: boolean,
        align?: 'left' | 'right' | 'center',
        width?: string | 'w-full',
        closeOnContentClick?: boolean,
        position?: 'absolute' | 'bottom' | 'top',
        contentClasses?: string[],
        disabled?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        align: 'left',
        width: '',
        closeOnContentClick: true,
        position: 'bottom',
        contentClasses: () => [],
        disabled: false,
    });

    interface Emits {
        (event: 'update:modelValue', data: boolean);
    }

    const emits = defineEmits<Emits>();

    const open: Ref<boolean> = ref(false);
    const menu: Ref<HTMLElement | null> = ref(null);
    const triggerContainer: Ref<HTMLElement | null> = ref(null);

    const closeOnEscape = (e: KeyboardEvent) => {
        if (open.value && e.key === 'Escape') {
            open.value = false;
        }
    };

    const openMenu = () => {
        if (!props.disabled) {
            open.value = true;
            emits('update:modelValue', open.value);
            usePosition(props.position, props.align, props.width, menu, triggerContainer);
        }
    }

    const closeOnContent = () => {
        if (props.closeOnContentClick) {
            closeMenu();
        }
    };

    const closeMenu = () => {
        open.value = false;
    };

    watch(() => props.modelValue, () => {
        if (!props.modelValue) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    onMounted(() => {
        document.addEventListener('keydown', closeOnEscape);
        document.addEventListener('scroll', closeMenu);
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', closeOnEscape)
        document.removeEventListener('scroll', closeMenu)
    });

    const alignmentClasses: ComputedRef<object> = computed(() => ({
        'origin-top-left': props.align === 'left',
        'origin-top-right': props.align === 'right',
        'origin-top': !props.align,
        'mb-1': props.position === 'top',
        'mt-1': props.position === 'bottom',
    }));
</script>

<template>
    <div>
        <div @click.stop="useClick($event); openMenu()" ref="triggerContainer">
            <slot name="trigger" :open="open"/>
        </div>

        <!-- Full Screen Dropdown Overlay -->
        <div v-show="open" class="fixed inset-0 z-40" @click="closeMenu"/>

        <transition
            enter-active-class="transition-all duration-150"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                ref="menu"
                v-show="open"
                class="fixed z-40 bg-white shadow-md sm:rounded-lg overflow-hidden border border-gray-200"
                :class="[width !== 'w-full' ? width : '', alignmentClasses, contentClasses]"
                @click="closeOnContent"
            >
                <slot name="content"/>
            </div>
        </transition>
    </div>
</template>

