<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import {resolveBg} from "@/components/Partials/colors";
    import SIcon from "@/components/SIcon.vue";

    interface Props {
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        closable?: boolean,
        disabled?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        color: '',
        closable: false,
        disabled: false,
    });

    const chipClassObject: ComputedRef<object> = computed(() => ({
        [`${resolveBg(props.color)} bg-opacity-20`]: props.color,
        'bg-gray-200': !props.color,
        'bg-opacity-70': props.disabled,
        'px-2': !props.closable,
        'pl-2 pr-1': props.closable,
    }));

    interface Emits {
        (event: 'click:close');
    }

    const emits = defineEmits<Emits>();

    const closeChip = () => {
        if (!props.disabled) {
            emits('click:close');
        }
    };
</script>

<template>
    <div class="rounded-full pt-0.5 text-sm flex flex-row items-center space-x-1 select-none"
         :class="chipClassObject"
    >
        <div>
            <slot/>
        </div>
        <div class="w-4 h-4 mb-0.5 bg-white rounded-full"
             :class="[!disabled ? 'cursor-pointer' : '']"
             v-if="closable"
             @click.stop="closeChip"
        >
            <SIcon icon="x-mark" :size="16"/>
        </div>
    </div>
</template>

<style scoped>

</style>
