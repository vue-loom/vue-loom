<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, ref, type Ref, watch} from 'vue';
    import {resolveBorderFocus, resolveText} from "@/partials/colors";
    import VIcon from "@/components/VIcon.vue";

    interface Props {
        modelValue: string | null;
        label?: string;
        color?: string,
        clearable?: boolean;
        maxLength?: number | null;
        rows?: number;
        autoFocus?: boolean;
        readOnly?: boolean;
        autoGrowth?: boolean;
        errorMessage?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        label: '',
        color: 'primary',
        clearable: false,
        maxLength: null,
        rows: 3,
        autoFocus: false,
        readOnly: false,
        autoGrowth: false,
        errorMessage: '',
    });

    const innerModelValue: Ref<string> = ref(props.modelValue || '');
    const innerErrorMessage: Ref<string> = ref(props.errorMessage);

    interface Emits {
        (event: 'update:modelValue', data: string): void;

        (event: 'focus'): void;

        (event: 'blur'): void;
    }

    const emits = defineEmits<Emits>();

    watch((): string | null => props.modelValue, (value): void => {
        innerModelValue.value = value || '';
    });

    watch(innerModelValue, (val): void => {
        innerErrorMessage.value = '';

        emits('update:modelValue', val);
    });

    watch((): string => props.errorMessage, (value): void => {
        innerErrorMessage.value = value;
    });

    const focused: Ref<boolean> = ref(false);
    const textArea: Ref<HTMLElement | null> = ref(null);
    const textAreaLabel: Ref<HTMLElement | null> = ref(null);
    const textAreaLabelWidth: Ref<number> = ref(0);

    const setBorderGapWidth = (): void => {
        if (textAreaLabel.value) {
            textAreaLabelWidth.value = textAreaLabel.value.getBoundingClientRect().width + 4;
        }
    };

    onMounted((): void => {
        setBorderGapWidth();
    });

    const focusTextArea = (): void => {
        textArea.value?.focus();
        focused.value = true;
        emits('focus');
    };

    const blurTextArea = (): void => {
        textArea.value?.blur();
        focused.value = false;
        emits('blur');
    }

    const textAreaAdjust = (): void => {
        if (textArea.value && textArea.value.scrollHeight > textArea.value.clientHeight) {
            textArea.value.style.height = '1px';
            textArea.value.style.height = `${textArea.value.scrollHeight}px`;
        }
    }

    const clearTextArea = (): void => {
        innerModelValue.value = '';
        textArea.value?.focus();
    }

    const detailsClassObject: ComputedRef<object> = computed(() => ({
        'justify-between': props.errorMessage && props.maxLength,
        'justify-start': props.errorMessage && !props.maxLength,
        'justify-end': !props.errorMessage && props.maxLength,
    }));

    const labelClassObject: ComputedRef<object> = computed(() => ({
        'top-2': !focused.value && !innerModelValue.value,
        '-top-2.5 scale-75': focused.value || innerModelValue.value,
        [resolveText(props.color)]: focused.value,
        'text-gray-400': !focused.value,
    }));

    const inputClassObject: ComputedRef<object> = computed(() => ({
        [resolveBorderFocus(props.color)]: focused.value,
        'border-gray-300': !focused.value,
        '!border-red-600': props.errorMessage,
        'overflow-hidden': props.autoGrowth,
    }));
</script>

<template>
    <div class="relative">
        <div ref="textAreaLabel" class="absolute left-0 top-0 scale-75 invisible z-[-1]" v-text="label"/>

        <div class="absolute left-3 top-0 border-b border-white transition-all duration-150"
             :style="{width: focused || innerModelValue ? `${textAreaLabelWidth}px` : '0px'}"
        ></div>

        <div class="absolute left-3.5 transition-all origin-top-left duration-150"
             :class="labelClassObject"
             @click="focusTextArea"
        >{{ label }}
        </div>

        <div class="absolute right-2 top-2 cursor-pointer" v-if="clearable && innerModelValue" @click="clearTextArea()">
            <VIcon icon="x-mark"/>
        </div>

        <textarea
            ref="textArea"
            class="w-full border focus:border rounded-lg ring-0 focus:ring-0 focus:outline-0 transition-all duration-150 align-top"
            :class="inputClassObject"
            :rows="rows"
            :readonly="readOnly"
            :autofocus="autoFocus"
            :maxlength="maxLength as number"
            v-model="innerModelValue"
            @focus="focusTextArea()"
            @blur="blurTextArea()"
            @keyup="autoGrowth ? textAreaAdjust() : ''"
        ></textarea>

        <div class="flex flex-row pl-1" :class="detailsClassObject">
            <div class="text-red-600 text-xs" v-if="errorMessage">
                {{ errorMessage }}
            </div>
            <div class="text-xs text-gray-500 text-end pr-2 whitespace-nowrap"
                 v-if="maxLength">
                {{ innerModelValue.length }} / {{ maxLength }}
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
