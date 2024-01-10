<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import VIcon from "@/components/VIcon.vue";

    interface Props {
        type?: 'default' | 'info' | 'success' | 'warning' | 'error';
    }

    const props = withDefaults(defineProps<Props>(), {
        type: 'default',
    });

    const classesFromType: ComputedRef<string> = computed(() => {
        switch (props.type) {
            case 'default':
                return 'bg-gray-200 border-gray-400 text-gray-700';
            case 'info':
                return 'bg-primary/10 border-primary text-primary';
            case 'success':
                return 'bg-success/10 border-success text-success';
            case 'warning':
                return 'bg-warning/10 border-warning text-warning';
            case 'error':
                return 'bg-danger/10 border-danger text-danger';
            default:
                return 'bg-gray-200 border-gray-400 text-gray-700';
        }
    });
</script>

<template>
    <div class="w-full rounded-lg bg-white">
        <div class="w-full flex items-center space-x-2 p-4 rounded-lg border-l-4" :class="[classesFromType]">
            <div>
                <VIcon icon="check-circle" color="success" v-if="type === 'success'"/>
                <VIcon icon="x-circle" color="danger" v-if="type === 'error'"/>
                <VIcon icon="exclamation-triangle" color="warning" v-if="type === 'warning'"/>
                <VIcon icon="exclamation-circle" v-if="type === 'info'"/>
            </div>
            <div>
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
