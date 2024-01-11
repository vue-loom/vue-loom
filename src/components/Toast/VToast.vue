<script setup lang="ts">
    import {computed, type ComputedRef, ref, type Ref, useSlots, watch} from "vue";
    import {resolveBg} from "@/partials/colors";
    import VIcon from "@/components/VIcon.vue";

    interface Props {
        modelValue: boolean,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
        duration?: number,
        rounded?: boolean,
        type?: 'info' | 'warning' | 'error' | 'success',
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        color: 'bg-gray-700',
        position: 'top-right',
        duration: 3000,
        rounded: false,
        type: 'info',
    });

    interface Emits {
        (event: 'update:modelValue', data: boolean): void;
    }

    const emits = defineEmits<Emits>();

    const innerModelValue: Ref<boolean> = ref(props.modelValue);
    const slots: string[] = Object.keys(useSlots());
    const hasAction: ComputedRef<boolean> = computed(() => slots.includes('action'));
    const hasTitle: ComputedRef<boolean> = computed(() => slots.includes('title'));

    watch((): boolean => props.modelValue, (): void => {
        if (props.duration) {
            setTimeout((): void => {
                innerModelValue.value = false;
                emits('update:modelValue', innerModelValue.value);
            }, props.duration);
        }
    });

    const toastClassObject: ComputedRef<object> = computed(() => ({
        'bottom-2 right-2': props.position === 'bottom-right',
        'bottom-2 left-2': props.position === 'bottom-left',
        'top-[72px] right-2': props.position === 'top-right',
        'top-[72px] left-2': props.position === 'top-left',
    }));

    const closeToast = (): void => {
        innerModelValue.value = false;
        emits('update:modelValue', innerModelValue.value);
    }
</script>

<template>
    <div class="fixed z-50" :class="toastClassObject">
        <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div ref="toast" class="text-white p-2 shadow-md flex relative"
                 :class="[color !== 'bg-gray-700' ? resolveBg(color) : 'bg-gray-700', rounded ? 'rounded-full' : 'rounded-lg']"
                 v-show="props.modelValue"
            >
                <div v-if="type" class="pr-2" :class="[hasTitle ? `pt-1` : '']">
                    <VIcon solid icon="check-circle" color="success" v-if="type === 'success'"/>
                    <VIcon solid icon="x-circle" color="danger" v-if="type === 'error'"/>
                    <VIcon solid icon="exclamation-triangle" color="warning" v-if="type === 'warning'"/>
                    <VIcon solid icon="exclamation-circle" v-if="type === 'info'"/>
                </div>
                <div>
                    <div class="font-bold capitalize">
                        <slot name="title"/>
                    </div>
                    <div class="text-sm font-bold text-gray-300">
                        <slot name="subtitle"/>
                    </div>
                    <div class="text-sm text-gray-300">
                        <slot name="content"/>
                    </div>
                    <div :class="[hasAction ? 'text-end mt-2' : '']">
                        <slot name="action"/>
                    </div>
                </div>
                <div class="pl-2">
                    <div class="hover:bg-black hover:bg-opacity-20 rounded-full cursor-pointer">
                        <VIcon icon="x-mark" @click="closeToast()"/>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>

</style>
