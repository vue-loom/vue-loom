import {type Ref, ref, toValue} from "vue";

interface DialogAction {
    label: string;
    color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
    type?: 'outlined' | 'text' | 'default';
    handle: () => void;
}

interface Params {
    title?: string;
    subtitle?: string;
    content: string | any,
    color?: string;
    width?: number;
    persistent?: boolean;
    actions: DialogAction[],
}

interface Dialog {
    value: boolean;
    title?: string;
    subtitle?: string;
    content: string | any,
    actions: DialogAction[],
    color?: string;
    width?: number;
    persistent?: boolean;
    show: (params: Params) => void;
    hide: () => void;
}

const dialog: Ref<Dialog> = ref({
    value: false,
    title: '',
    subtitle: '',
    content: '',
    color: 'primary',
    width: null,
    persistent: false,
    actions: [],
    show: (params: Params): void => {
        dialog.value.title = params.title;
        dialog.value.subtitle = params.subtitle;
        dialog.value.content = params.content;
        dialog.value.actions = params.actions;
        dialog.value.color = params.color || dialog.value.color;
        dialog.value.width = params.width || dialog.value.width;
        dialog.value.persistent = params.persistent || dialog.value.persistent;

        dialog.value.value = true;
    },
    hide: (): void => {
        dialog.value.value = false;
    },
});

export const useDialog = (): Dialog => {
    return toValue(dialog);
}
