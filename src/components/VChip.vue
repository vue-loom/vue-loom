<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import {resolveBg, resolveText} from "@/partials/colors";
    import VIcon from "@/components/VIcon.vue";

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
        [`${resolveBg(props.color)} ${resolveText(props.color)} bg-opacity-20`]: props.color && !props.disabled,
        [`${resolveBg(props.color)} bg-opacity-10`]: props.disabled && props.color,
        'bg-gray-200': !props.color,
        'bg-opacity-60': props.disabled && !props.color,
        'px-2': !props.closable || (props.closable && props.disabled),
        'pl-2 pr-1': props.closable && !props.disabled,
    }));

    interface Emits {
        (event: 'click:close'): void;
    }

    const emits = defineEmits<Emits>();

    const closeChip = () => {
        if (!props.disabled) {
            emits('click:close');
        }
    };
</script>

<template>
    <div class="rounded-full h-[24px] text-sm flex flex-row items-center space-x-1 select-none"
         :class="chipClassObject"
    >
        <div>
            <slot/>
        </div>

        <div class="w-4 h-4 bg-white rounded-full"
             :class="[!disabled ? 'cursor-pointer' : '']"
             v-if="closable && !disabled"
             @click.stop="closeChip"
        >
            <VIcon icon="x-mark" :size="16"/>
        </div>
    </div>
</template>

<style scoped>

</style>
