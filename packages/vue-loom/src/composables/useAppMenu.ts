import {ref} from "vue";

const isOpen = ref<boolean>(true);
const useChanged = ref<boolean>(false);
const isDrawer = ref<boolean>(false);

export const useAppMenu = () => {
    const toggle = (): void => {
        isOpen.value = !isOpen.value;
        useChanged.value = true;
    };

    return {
        isOpen,
        useChanged,
        isDrawer,
        toggle,
    };
};