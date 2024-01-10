<script setup lang="ts">
    import {useToast} from "@/components/Composables/toast";
    import SToast from "@/components/Toast/VToast.vue";
    import {computed, type ComputedRef, watch} from "vue";
    import {usePage} from "@inertiajs/vue3";

    const flash: ComputedRef<Flash> = computed(() => usePage().props.flash as Flash);
    const type = computed(() => flash.value.messageStyle || 'success');
    const subtitle = computed(() => flash.value.message);
    const duration = computed(() => flash.value.messageDuration || 3000);

    const clearMessage = () => {
        (usePage().props.flash as Flash).message = '';
    };

    watch(subtitle, () => {
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
    <SToast v-model="useToast().value"
            :type="useToast().type"
            :duration="useToast().duration"
            :position="useToast().position"
    >
        <template #title>
            {{ useToast().title }}
        </template>
        <template #content>
            {{ useToast().subtitle }}
        </template>
    </SToast>
</template>

<style scoped>

</style>
