<script setup lang="ts">
    import VCard from "@/components/VCard.vue";
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogTitle,
        DialogTrigger,
    } from '@/shadcn/ui/dialog';
    import {VisuallyHidden} from "radix-vue";

    const modelValue = defineModel<boolean>({required: true});

    interface Props {
        maxWidth?: 'fit' | 'full' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl',
        persistent?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        maxWidth: '4xl',
        persistent: false,
    });

    const closeDialog = (): void => {
        if (!props.persistent) {
            modelValue.value = false;
        }
    };
</script>

<template>
    <Dialog :open="modelValue" @update:open="closeDialog">
        <DialogTrigger>
            <slot name="trigger"/>
        </DialogTrigger>
        <DialogContent class="p-0 border-none">
            <VisuallyHidden>
                <DialogTitle/>
                <DialogDescription/>
            </VisuallyHidden>
            <VCard>
                <template #title>
                    <DialogTitle>
                        <slot name="title"/>
                    </DialogTitle>
                </template>
                <template #subtitle>
                    <slot name="subtitle"/>
                </template>
                <template #content>
                    <slot name="content"/>
                </template>
                <template #actions>
                    <slot name="actions"/>
                </template>
            </VCard>
        </DialogContent>
    </Dialog>
</template>

<style scoped>

</style>
