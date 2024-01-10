<script setup lang="ts">
    import {resolveBg, resolveBorder} from "@/components/Partials/colors";
    import type {ComputedRef, Ref} from "vue";
    import {computed, ref} from "vue";
    import VIcon from "@/components/VIcon.vue";

    interface Props {
        modelValue: boolean | string | number;
        trueValue?: boolean | string | number;
        falseValue?: string | number | boolean;
        label?: string;
        color?: string;
        disabled?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        trueValue: true,
        falseValue: false,
        label: '',
        color: 'primary',
        disabled: false,
    });

    const innerModelValue: Ref<boolean | string | number> = ref(props.modelValue);
    const toggleState: Ref<boolean> = ref(innerModelValue.value === props.trueValue);

    interface Emits {
        (event: 'update:modelValue', data: boolean | string | number): void;
    }

    const emits = defineEmits<Emits>();

    const toggleCheckbox = (): void => {
        toggleState.value = !toggleState.value;
        innerModelValue.value = toggleState.value ? props.trueValue : props.falseValue;

        emits('update:modelValue', innerModelValue.value);
    }

    const checkboxClassObject: ComputedRef<object> = computed(() => ({
        // [resolveBg(props.color)]: toggleState.value,
        [resolveBorder(props.color)]: toggleState.value,
        'border-gray-300': !toggleState.value,
    }));
</script>

<template>
    <div class="space-x-2 flex items-center select-none">
        <div class="cursor-pointer" :class="[disabled ? 'relative' : '']">
            <div :class="disabled ? 'absolute bg-white border-white opacity-30 rounded-sm w-full h-full' : ''"/>
            <div class="h-5 w-5 border-2 rounded transition-all duration-150"
                 :class="checkboxClassObject"
                 @click="toggleCheckbox()"
            >
                <div class="h-full w-full transition-all duration-150"
                     :class="[toggleState ? 'scale-100 opacity-100' : 'scale-50 opacity-0', resolveBg(color)]"
                >
                    <VIcon icon="check" color="white" :size="16"/>
                </div>
            </div>
        </div>
        <div class="text-gray-500 text-sm">{{ label }}</div>
    </div>
</template>

<style scoped>

</style>
