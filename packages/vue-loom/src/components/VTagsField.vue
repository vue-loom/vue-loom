<script setup lang="ts">
    import {TagsInput, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput} from './ui/tags-input';
    import {type HTMLAttributes, watch} from "vue";
    import {cn} from "../lib/utils";
    import {Label} from './ui/label';

    interface Props {
        disabled?: boolean,
        label?: string,
        placeholder?: string,
        class?: HTMLAttributes['class'],
    }

    const modelValue = defineModel<string[]>({required: true, default: []});
    const errorMessage = defineModel<string | number>('errorMessage');

    const props = defineProps<Props>();

    watch(modelValue, () => {
        errorMessage.value = '';
    });
</script>

<template>
    <div class="flex flex-col gap-1">
        <Label v-if="label">{{ label }}</Label>
        <TagsInput :class="cn('py-1', props.class)" v-model="modelValue" :disabled="disabled">
            <TagsInputItem class="bg-muted" v-for="item in modelValue" :key="item" :value="item">
                <TagsInputItemText/>
                <TagsInputItemDelete/>
            </TagsInputItem>

            <TagsInputInput class="border-none focus:border-none focus:outline-none focus:ring-0" :placeholder="placeholder"/>
        </TagsInput>
        <p v-if="errorMessage" class="text-destructive text-xs">{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

</style>
