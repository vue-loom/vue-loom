<script setup lang="ts">
    import type {Ref} from "vue";
    import VCard from "@/components/VCard.vue";
    import {ref} from "vue";

    interface Props {
        modelValue: boolean,
        width?: number | null,
        persistent?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        width: null,
        persistent: false,
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
        <Teleport to="body">
            <div ref="dialogScreen"
                 class="fixed top-0 left-0 h-screen w-screen overflow-hidden bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center select-none"
                 @wheel.prevent
                 @scroll.prevent
                 @click="persistent ? togglePersistent() : closeDialog()"
                 v-if="modelValue">
                <VCard ref="dialogCard"
                       class="p-4 transition-all duration-[50ms] ease-in max-w-4xl w-full"
                       :class="[persistentAnimation ? 'scale-[1.01]' : '']"
                       @click.stop>
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
        </Teleport>
    </Transition>
</template>

<style scoped>

</style>
