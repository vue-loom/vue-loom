<script setup lang="ts">
    import {computed, type ComputedRef, type Ref} from "vue";
    import VCard from "@/components/VCard.vue";
    import {ref} from "vue";

    interface Props {
        modelValue: boolean,
        maxWidth?: 'fit' | 'full' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl',
        persistent?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        maxWidth: '4xl',
        persistent: false,
    });

    const innerMaxWidth: ComputedRef<string> = computed(() => {
        switch (props.maxWidth) {
            case 'xs':
                return 'max-w-xs';
            case 'sm':
                return 'max-w-sm';
            case 'md':
                return 'max-w-md';
            case 'lg':
                return 'max-w-lg';
            case 'xl':
                return 'max-w-xl';
            case '2xl':
                return 'max-w-2xl';
            case '3xl':
                return 'max-w-3xl';
            case '4xl':
                return 'max-w-4xl';
            case '5xl':
                return 'max-w-5xl';
            case '6xl':
                return 'max-w-6xl';
            case '7xl':
                return 'max-w-7xl';
            case 'full':
                return 'max-w-full';
            case 'fit':
                return 'max-w-fit';
            default:
                return '';
        }
    });

    interface Emits {
        (event: 'update:modelValue', data: boolean): void;
    }

    const emits = defineEmits<Emits>();

    const innerModelValue: Ref<boolean> = ref(props.modelValue);
    const dialogCard: Ref<HTMLElement | null> = ref(null);
    const persistentAnimation: Ref<boolean> = ref(false);

    const closeDialog = (): void => {
        if (!props.persistent) {
            innerModelValue.value = false;
            emits('update:modelValue', innerModelValue.value);
        }
    }

    const togglePersistent = (): void => {
        persistentAnimation.value = true;
        setTimeout(() => {
            persistentAnimation.value = false;
        }, 200);
    }
</script>

<template>
    <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div ref="dialogScreen"
             class="fixed top-0 left-0 h-dvh w-screen overflow-hidden bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center select-none"
             @wheel.prevent
             @scroll.prevent
             @click="persistent ? togglePersistent() : closeDialog()"
             v-if="modelValue"
        >
            <VCard ref="dialogCard"
                   class="p-4 transition-all duration-[50ms] ease-in w-full"
                   :class="[persistentAnimation ? 'scale-[1.01]' : '', innerMaxWidth]"
                   @click.stop
            >
                <template #title>
                    <slot name="title"/>
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
        </div>
    </Transition>
</template>

<style scoped>

</style>
