<script setup lang="ts">
    import Checkbox from "./ui/checkbox/Checkbox.vue";
    import {computed, type HTMLAttributes, onMounted, ref, type Ref, watch} from "vue";
    import {cn} from "../lib/utils";
    import {Label} from './ui/label';
    import {useForwardProps} from "radix-vue";

    defineOptions({
        inheritAttrs: false,
    });

    interface Props {
        disabled?: boolean,
        label?: string,
        trueValue?: string | number | boolean,
        falseValue?: string | number | boolean,
        class?: HTMLAttributes['class'],
    }

    const modelValue = defineModel<string | number | boolean | null | undefined>({default: false});

    const props = withDefaults(defineProps<Props>(), {
        trueValue: true,
        falseValue: false,
    });

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwarded = useForwardProps(delegatedProps);

    const checkedValue: Ref<boolean> = ref(false);

    watch(() => checkedValue.value, (value) => {
        if (value) {
            modelValue.value = props.trueValue;
        } else {
            modelValue.value = props.falseValue;
        }
    });

    watch(() => modelValue.value, (value) => {
        checkedValue.value = value === props.trueValue;
    });

    onMounted(() => {
        if (props.trueValue) {
            checkedValue.value = props.trueValue === modelValue.value;
        }
    });
</script>

<template>
    <Label class="flex items-center gap-2">
        <Checkbox v-model:checked="checkedValue" :class="cn('w-5 h-5', props.class)" v-bind="{...forwarded, ...$attrs}"/>
        {{ label }}
    </Label>
</template>

<style scoped>

</style>
