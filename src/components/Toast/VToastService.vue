<script setup lang="ts">
    import {useToast} from "@/composables/toast";
    import VToast from "@/components/Toast/VToast.vue";
    import {computed, type ComputedRef, watch} from "vue";
    import {usePage} from "@inertiajs/vue3";
    import type {Flash} from "@/globals/flash";

    interface Props {
        appbarOffset?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        appbarOffset: false,
    });

    const flash: ComputedRef<Flash | null> = computed(() => usePage().props ? usePage().props.flash as Flash : null);
    const type: ComputedRef<string> = computed(() => flash.value?.messageStyle || 'success');
    const subtitle: ComputedRef<string> = computed(() => flash.value?.message || '');
    const duration: ComputedRef<number> = computed(() => flash.value?.messageDuration || 3000);

    const clearMessage = (): void => {
        (usePage().props.flash as Flash).message = '';
    };

    watch(subtitle, (): void => {
        if (subtitle.value) {
            useToast().show({
                title: type.value,
                subtitle: subtitle.value || '',
                type: type.value as 'success' | 'warning' | 'info' | 'error',
                duration: duration.value,
            });

            clearMessage();
        }
    });
</script>

<template>
    <VToast v-model="useToast().value"
            :type="useToast().type"
            :duration="useToast().duration"
            :position="useToast().position"
            :appbar-offset="appbarOffset"
    >
        <template #title>
            {{ useToast().title }}
        </template>
        <template #content>
            {{ useToast().subtitle }}
        </template>
    </VToast>
</template>

<style scoped>

</style>
