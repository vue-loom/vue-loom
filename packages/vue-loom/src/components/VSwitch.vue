<script setup lang="ts">
    import {type HTMLAttributes, onMounted, ref, type Ref, watch} from "vue";
    import {Switch} from "./ui/switch";
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

    const modelValue = defineModel<string | number | boolean>({required: true});

    const props = withDefaults(defineProps<Props>(), {
        trueValue: true,
        falseValue: false,
    });

    const forwarded = useForwardProps(props);

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
        <Switch v-model:checked="checkedValue" v-bind="{...forwarded, ...$attrs}"/>
        {{ label }}
    </Label>
</template>

<style scoped>

</style>
