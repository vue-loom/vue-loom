<script setup lang="ts">
    import {type ComputedRef} from "vue";
    import {computed} from "vue";
    import {resolveBg} from "@/components/Partials/colors";
    import VIcon from "@/components/VIcon.vue";

    interface Props {
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        dense?: boolean;
        showMenuButton?: boolean;
        elevated?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'primary',
        showMenuButton: false,
        elevated: false,
    });

    const barClassObject: ComputedRef<object> = computed(() => ({
        [resolveBg(props.color)]: true,
        'h-16': !props.dense,
        'shadow-xl': props.elevated,
    }));

    interface Emits {
        (event: 'click:menuIcon'): void;
    }

    const emits = defineEmits<Emits>();

    const toggleMenu = () => {
        emits('click:menuIcon');
    };
</script>

<template>
    <header class="w-full flex justify-between items-center select-none z-50" :class="barClassObject">
        <div class="h-full flex items-center">
            <div
                class="h-full px-3 flex items-center hover:bg-white/10 active:bg-white/20 cursor-pointer transition-all duration-150"
                v-show="showMenuButton"
                @click.stop="toggleMenu"
            >
                <VIcon icon="bars-3" color="white" size="md"/>
            </div>
            <div class="pl-3 font-semibold text-xl text-white line-clamp-1">
                <slot></slot>
            </div>
        </div>
        <div>
            <slot name="actions"></slot>
        </div>
    </header>
</template>

<style scoped>

</style>
