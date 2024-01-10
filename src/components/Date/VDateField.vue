<script setup lang="ts">
    import STextField from "@/components/STextField.vue";
    import {CalendarDaysIcon as OutlinedCalender} from "@heroicons/vue/24/outline";
    import {CalendarDaysIcon as SolidCalender} from "@heroicons/vue/24/solid";
    import {computed, type ComputedRef, ref, type Ref} from "vue";
    import VMenu from "@/components/VMenu.vue";
    import SDatePicker from "@/components/Date/VDatePicker.vue";
    import {resolveText} from "@/components/Partials/colors";
    import dayjs from "dayjs";

    interface Props {
        modelValue: string | null;
        label?: string;
        errorMessage?: string,
        color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
        autofocus?: boolean;
        allowedDates?: number[] | string[],
        min?: string,
        max?: string,
        elevation?: boolean,
        align?: 'left' | 'right',
        position?: 'absolute' | 'top' | 'bottom'
        format?: string,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: null,
        label: '',
        errorMessage: '',
        color: 'primary',
        autofocus: false,
        min: '',
        max: '',
        allowedDates: () => [],
        elevation: false,
        align: 'left',
        position: 'bottom',
        format: 'YYYY-MM-DD'
    });

    interface Emits {
        (event: 'update:modelValue', data: string | null): void;
    }

    const emits = defineEmits<Emits>();

    const innerModelValue: Ref<string | null> = ref(props.modelValue);

    const selectedDate = (): void => {
        emits('update:modelValue', innerModelValue.value);
    }

    const displayName: ComputedRef<string> = computed(() => innerModelValue.value ? dayjs(innerModelValue.value).format(props.format) : '');
    const focused: Ref<boolean> = ref(false);

    const focusInput = (): void => {
        focused.value = true;
    };

    const blurInput = (): void => {
        focused.value = false;
    };

</script>

<template>
    <div class="relative">
        <VMenu :close-on-content-click="false" :align="align" :position="position" width="w-fit">
            <template #trigger>
                <STextField
                    readonly
                    class="grow"
                    ref="dateField"
                    :label="label"
                    :color="color"
                    :error-message="errorMessage"
                    :autofocus="autofocus"
                    :model-value="displayName"
                    @focus="focusInput()"
                    @blur="blurInput()"
                >
                    <template #suffix>
                        <div>
                            <OutlinedCalender v-if="!focused"
                                              class="w-5 h-5 transition-all duration-150"
                                              aria-disabled="true"
                                              :class="[focused ? `${resolveText(color)}` : 'text-gray-400']"
                            />
                            <SolidCalender v-else
                                           class="w-5 h-5 transition-all duration-150"
                                           aria-disabled="true"
                                           :class="[focused ? `${resolveText(color)}` : 'text-gray-400']"
                            />
                        </div>
                    </template>
                </STextField>
            </template>
            <template #content>
                <SDatePicker
                    v-model="innerModelValue"
                    :color="color"
                    :elevation="elevation"
                    :min="min"
                    :max="max"
                    :allowed-dates="allowedDates"
                    @click="selectedDate()"
                />
            </template>
        </VMenu>
    </div>
</template>

<style scoped>

</style>
