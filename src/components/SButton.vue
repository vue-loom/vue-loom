<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, ref, type Ref} from 'vue';
    import {
        getContrastColorClass,
        resolveBg,
        resolveBgHover, resolveBorder,
        resolveText
    } from "@/components/Partials/colors";
    import {useRipple} from "@/components/Composables/mouse";
    import SLoader from "@/components/SLoader.vue";

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
    const buttonWidth: Ref<number> = ref(0);
    const buttonHeight: Ref<number> = ref(0);

    const calculateButtonDimensions = (): void => {
        buttonWidth.value = button.value.getBoundingClientRect().width - 32;
        buttonHeight.value = button.value.getBoundingClientRect().height - 16;
    }

    onMounted(() => calculateButtonDimensions());

    interface TypeClass {
        [key: string]: string;
    }

    const typeClassMap: ComputedRef<TypeClass> = computed(() => ({
        default: `${resolveBg(props.color)} text-white shadow-md active:shadow-none hover:bg-opacity-90 disabled:opacity-50`,
        outlined: `border-2 ${resolveBorder(props.color)} ${resolveText(props.color)} shadow-md active:shadow-none ${resolveBgHover(props.color)} hover:bg-opacity-10 disabled:opacity-60`,
        text: `${resolveText(props.color)} ${resolveBgHover(props.color)} hover:bg-opacity-10 disabled:opacity-60`,
    }));

    const textColor: ComputedRef<string> = computed(() => {
        if (button.value) {
            let buttonColor: string = getComputedStyle(button.value).getPropertyValue('background-color');

            return getContrastColorClass(buttonColor);
        }

        return 'white';
    });

    const createRipple = (event: MouseEvent) => {
        useRipple(event, button);
    }
</script>

<template>
    <button ref="button"
            type="button"
            class="py-2 px-4 rounded-lg transition-all duration-150 overflow-hidden font-bold"
            :class="[typeClassMap[type], !noRelative ? 'relative' : '']"
            :disabled="innerDisabled"
            @click="createRipple($event)"
    >
        <div v-if="!loading">
            <slot/>
        </div>
        <div v-else class="flex justify-center items-center"
             :style="{width: `${buttonWidth}px`, height: `${buttonHeight}px`}">
            <SLoader :color="type !== 'default' ? color : 'default'"/>
        </div>
    </button>
</template>

<style scoped>

</style>
