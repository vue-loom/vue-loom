<script setup lang="ts">
    import {computed, type HTMLAttributes, watch} from "vue";
    import {cn} from "../lib/utils";
    import {Textarea} from "./ui/textarea";
    import {useForwardProps} from "radix-vue";
    import {Label} from './ui/label';

    defineOptions({
        inheritAttrs: false,
    });

    interface Props {
        disabled?: boolean,
        readonly?: boolean,
        label?: string,
        placeholder?: string,
        type?: string,
        class?: HTMLAttributes['class'],
        required?: boolean,
        max?: number | string,
        min?: number | string,
        minlength?: number | string,
        maxlength?: number | string,
        pattern?: string,
        step?: number | string,
    }

    const modelValue = defineModel<string | number>({required: true});
    const errorMessage = defineModel<string | number>('errorMessage');

    const props = defineProps<Props>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwarded = useForwardProps(delegatedProps);

    watch(modelValue, () => {
        errorMessage.value = '';
    });
</script>

<template>
    <div class="flex flex-col gap-1">
        <Label v-if="label">{{ label }}</Label>
        <Textarea v-model="modelValue"
                  :class="cn('focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-ring', props.class)"
                  v-bind="{...forwarded, ...$attrs}"/>
        <p v-if="errorMessage" class="text-destructive text-xs">{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

</style>
