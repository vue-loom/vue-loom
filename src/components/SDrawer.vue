<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, onUnmounted, ref, type Ref, watch} from "vue";

    interface Props {
        modelValue?: boolean;
        left?: boolean;
        right?: boolean;
        mini?: boolean;
        overlay?: boolean;
        toolbarOffset?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        left: true,
        right: false,
        mini: false,
        overlay: false,
        toolbarOffset: false,
    });

    const innerModelValue: Ref<boolean> = ref(props.modelValue);

    watch(() => props.modelValue, (value) => innerModelValue.value = value);

    interface Emits {
        (event: 'update:modelValue', data: boolean);
    }

    const emits = defineEmits<Emits>();

    const updateOpenState = (): void => {
        // Tailwind 2xl breakpoint
        innerModelValue.value = innerWidth >= 1536;

        emits('update:modelValue', innerModelValue.value);
    };

    const innerMini: Ref<boolean> = ref(props.mini);

    const updateMiniState = (): void => {
        // Tailwind xl breakpoint
        innerMini.value = innerWidth >= 1280;
    };

    onMounted(() => {
        window.addEventListener('resize', updateOpenState);
        window.addEventListener('resize', updateMiniState);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', updateOpenState);
        window.removeEventListener('resize', updateMiniState);
    });

    const drawerWidth: ComputedRef<string> = computed(() => {
        if (!innerModelValue.value) {
            if (innerMini.value) {
                return 'w-14';
            }

            return 'w-0'
        }

        return 'w-80';
    });

    const drawerClassObject: ComputedRef<object> = computed(() => ({
        'left-0': props.left,
        'right-0': props.right,
        'top-16 h-[calc(100vh-56px)]': props.toolbarOffset,
        'top-0 h-screen': !props.toolbarOffset,
        [drawerWidth.value]: true,
    }));
</script>

<template>
    <div
        class="fixed shadow-xl h-full overflow-y-auto bg-white transition-all duration-150 ease-in-out z-50 hover:!w-80"
        :class="[drawerClassObject]"
    >
        <slot></slot>
    </div>
</template>

<style scoped>

</style>
