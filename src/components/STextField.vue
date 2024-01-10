<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, type Ref, ref, useSlots, watch} from "vue";
    import {resolveText, resolveBorderFocus} from "@/components/Partials/colors";

    interface Props {
        modelValue: string | number | null;
        label?: string;
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        type?: 'text' | 'password' | 'number',
        autofocus?: boolean;
        readonly?: boolean;
        errorMessage?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        label: '',
        color: 'primary',
        type: 'text',
        autofocus: false,
        readonly: false,
        errorMessage: '',
    });

    const innerModelValue: Ref<string | number | null> = ref(props.modelValue);
    const innerErrorMessage: Ref<string> = ref(props.errorMessage);

    watch((): string | number | null => props.modelValue, (value): void => {
        innerModelValue.value = value;
    });

    watch((): string => props.errorMessage, (value): void => {
        innerErrorMessage.value = value;
    });

    const hasSuffix: boolean = Object.keys(useSlots()).indexOf('suffix') !== -1;
    const inputClassObject: ComputedRef<object> = computed(() => ({
        'pr-9': hasSuffix,
        [resolveBorderFocus(props.color)]: focused.value,
        'border-gray-300': !focused.value,
        '!border-danger': innerErrorMessage.value,
    }));

    interface Emits {
        (event: 'update:modelValue', data: string | number | null): void;

        (event: 'focus'): void;

        (event: 'blur'): void;
    }

    const emits = defineEmits<Emits>();

    watch(innerModelValue, (value): void => {
        innerErrorMessage.value = '';
        emits('update:modelValue', value);
    });

    const focused: Ref<boolean> = ref(false);
    const textField: Ref<HTMLElement | null> = ref(null);

    const textFieldLabel: Ref<HTMLElement | null> = ref(null);
    const textFieldLabelWidth: Ref<number> = ref(0);

    const setBorderGapWidth = (): void => {
        if (textFieldLabel.value) {
            textFieldLabelWidth.value = textFieldLabel.value.getBoundingClientRect().width + 4;
        }
    };

    onMounted((): void => {
        setBorderGapWidth();
    });

    const labelClassObject: ComputedRef<object> = computed(() => ({
        'top-2': !focused.value && !innerModelValue.value,
        '-top-2.5 scale-75': focused.value || innerModelValue.value,
        [resolveText(props.color)]: focused.value,
        'text-gray-400': !focused.value,
        '!text-danger': innerErrorMessage.value,
    }));

    const focusInput = (): void => {
        textField.value?.focus();
        focused.value = true;
        emits('focus');
    };

    const blurInput = (): void => {
        focused.value = false;
        emits('blur');
    };
</script>

<template>
    <div class="relative">
        <div ref="textFieldLabel" class="absolute left-0 top-0 text-xs invisible z-[-1]" v-text="label"/>

        <div class="absolute left-3 -top-[2px] border-y-[2px] border-white transition-all duration-150"
             :style="{width: focused || innerModelValue ? `${textFieldLabelWidth}px` : '0px'}"
        ></div>

        <div class="absolute left-3.5 transition-all origin-top-left duration-150"
             :class="labelClassObject"
             @click="focusInput"
        >{{ label }}
        </div>

        <div class="absolute right-2 top-2.5" v-show="hasSuffix">
            <slot name="suffix"/>
        </div>

        <input
            ref="textField"
            class="w-full border focus:border ring-0 focus:ring-0 focus:outline-0 rounded-md transition-all duration-150"
            :type="type"
            :class="inputClassObject"
            :autofocus="autofocus"
            :readonly="readonly"
            v-model="innerModelValue"
            @focus="focusInput"
            @blur="blurInput"
        >

        <div class="pt-0.5 pl-1 text-red-600 text-xs" v-if="innerErrorMessage">
            {{ innerErrorMessage }}
        </div>
    </div>
</template>

<style scoped>

</style>
