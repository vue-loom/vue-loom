<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, onUnmounted, type Ref, ref, watch} from 'vue';
    import {useClick, usePosition} from "@/composables/position";

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
        (event: 'update:modelValue', data: boolean): void;
    }

    const emits = defineEmits<Emits>();

    const open: Ref<boolean> = ref(false);
    const menu: Ref<HTMLElement | null> = ref(null);
    const triggerContainer: Ref<HTMLElement | null> = ref(null);

    const closeOnEscape = (e: KeyboardEvent): void => {
        if (open.value && e.key === 'Escape') {
            open.value = false;
        }
    };

    const openMenu = (event: MouseEvent | null = null): void => {
        if (!props.disabled) {
            if (props.position === 'absolute' && event) {
                useClick(event);
            }

            open.value = !open.value;

            emits('update:modelValue', open.value);
            usePosition(props.position, props.align, props.width, menu, triggerContainer);
        }
    }

    const closeOnContent = (): void => {
        if (props.closeOnContentClick) {
            closeMenu();
        }
    };

    const closeMenu = (): void => {
        open.value = false;
    };

    // useClickOutside(menu, () => {
    //     closeMenu();
    // });

    watch((): boolean => props.modelValue, (): void => {
        if (!props.modelValue) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    onMounted((): void => {
        document.addEventListener('keydown', closeOnEscape);
        document.addEventListener('scroll', closeMenu);
    });

    onUnmounted((): void => {
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
        <div @click.stop="openMenu" ref="triggerContainer">
            <slot name="trigger" :open="open"/>
        </div>

        <div v-show="open" class="fixed inset-0 z-30" @click="closeMenu"/>

        <Teleport to="body">
            <Transition
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
                    class="fixed z-30 bg-white shadow-md sm:rounded-lg overflow-hidden border border-gray-200"
                    :class="[width !== 'w-full' ? width : '', alignmentClasses, contentClasses]"
                    @click="closeOnContent"
                >
                    <slot name="content"/>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

