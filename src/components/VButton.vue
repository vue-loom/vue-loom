<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, ref, type Ref} from 'vue';
    import {
        resolveBg,
        resolveBgHover, resolveBorder,
        resolveText
    } from "@/partials/colors";
    import {useRipple} from "@/composables/mouse";
    import VLoader from "@/components/VLoader.vue";

    interface Props {
        disabled?: boolean;
        loading?: boolean;
        type?: 'outlined' | 'text' | 'default';
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        noRelative?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        disabled: false,
        loading: false,
        type: 'default',
        color: 'primary',
        noRelative: false,
    });

    const innerDisabled: ComputedRef<boolean> = computed(() => {
        return props.loading || props.disabled;
    });

    const button: Ref<HTMLElement | null> = ref(null);

    interface TypeClass {
        [key: string]: string;
    }

    const typeClassMap: ComputedRef<TypeClass> = computed(() => ({
        default: `${resolveBg(props.color)} text-white shadow-md active:shadow-none hover:bg-opacity-90 disabled:opacity-50`,
        outlined: `border-2 ${resolveBorder(props.color)} ${resolveText(props.color)} shadow-md active:shadow-none ${resolveBgHover(props.color)} hover:bg-opacity-10 disabled:opacity-60`,
        text: `${resolveText(props.color)} ${resolveBgHover(props.color)} hover:bg-opacity-10 disabled:opacity-60`,
    }));

    const loaderClassMap: ComputedRef<TypeClass> = computed(() => ({
        default: `${resolveBg(props.color)}`,
        outlined: `bg-white`,
        text: `bg-white`,
    }));

    const createRipple = (event: MouseEvent) => {
        useRipple(event, button);
    }
</script>

<template>
    <button ref="button"
            type="button"
            class="relative h-10 flex items-center rounded-lg transition-all duration-150 overflow-hidden font-bold"
            :class="[typeClassMap[type], !noRelative ? 'relative' : '']"
            :disabled="innerDisabled"
            @click="createRipple($event)"
    >
        <div class="px-4 py-2">
            <slot/>
        </div>
        <div class="absolute w-full h-full flex justify-center items-center"
             :class="[loaderClassMap[type]]"
             v-if="loading"
             >
            <VLoader :color="type !== 'default' ? color : 'default'"/>
        </div>
    </button>
</template>

<style scoped>

</style>
