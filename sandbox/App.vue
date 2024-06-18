<script setup lang="ts">
    import {
        VBanner,
        VCheckbox,
        VContainer,
        VDateField,
        VDialogService,
        VDrawer,
        VLoader,
        VMultiSelect,
        VSelect,
        VTextArea,
        VTimePicker,
        VToastService,
        VToggle,
        VToolbar,
        VTreeSelect,
        VTextField,
        VTooltip,
        VCard,
        VProgressBar,
        VBadge,
        VButton,
        VMenu,
        VListItem,
        VTag,
        VIcon,
        VTabs,
        VTab,
        VExpansionPanels,
        VExpansionPanel,
        VStepper,
        VStep,
        VDataTable,
        VChip,
        VToolbarAction,

        useToast,
        useDialog,
    } from "@";
    import {Ref, ref, watch} from "vue";
    import {TreeItem} from "@/component-types/TreeItem";
    import {SelectItem} from "@/component-types/SelectItem";
    import {simulateDataTableData} from "./helpers/helpers";
    import {DataTableMenuItem} from "@/component-types/DataTableMenuItem";
    import {DataTableItem} from "@/component-types/DataTableItem";
    import VRow from "@/components/Grid/VRow.vue";
    import VCol from "@/components/Grid/VCol.vue";
    import VDivider from "@/components/VDivider.vue";
    import VImage from "@/components/VImage.vue";
    import VRadio from "@/components/Radio/VRadio.vue";
    import VIconButton from "@/components/VIconButton.vue";
    import VDialog from "@/components/Dialog/VDialog.vue";
    import VOTPField from "@/components/OTPInput/VOTPField.vue";

    const value: Ref<string | null> = ref(null);
    const myValue: Ref<string | null> = ref(null);
    const time: Ref<string | null> = ref(null);
    const toggle: Ref<boolean> = ref(false);
    const checkValue: Ref<string> = ref('Yes');
    const drawerIsOpen: Ref<boolean> = ref(false);

    const selectItems: SelectItem[] = [
        {id: 1, name: 'January'},
        {id: 2, name: 'February'},
        {id: 3, name: 'March'},
        {id: 4, name: 'April'},
        {id: 5, name: 'June'},
        {id: 6, name: 'July'},
        {id: 7, name: 'September'},
        {id: 8, name: 'October'},
        {id: 9, name: 'November'},
        {id: 10, name: 'December'},
    ];

    interface ListItem {
        id: number;
        name: string;
        disabled: boolean;
        selected: boolean;
    }

    const listItems: ListItem[] = [
        {id: 1, name: 'January', disabled: true, selected: false},
        {id: 2, name: 'February', disabled: true, selected: false},
        {id: 3, name: 'March', disabled: true, selected: false},
        {id: 4, name: 'April', disabled: false, selected: false},
        {id: 5, name: 'June', disabled: false, selected: false},
        {id: 6, name: 'July', disabled: false, selected: false},
        {id: 7, name: 'September', disabled: false, selected: false},
        {id: 8, name: 'October', disabled: false, selected: false},
        {id: 9, name: 'November', disabled: false, selected: false},
        {id: 10, name: 'December', disabled: false, selected: false},
    ];

    const tree: TreeItem[] = [
        {
            id: 1,
            name: 'Test1',
            children: [
                {
                    id: 2, name: 'Test2', children: [
                        {id: 3, name: 'Test3', children: []},
                        {id: 4, name: 'Test4', children: []},
                    ],
                },
                {id: 5, name: 'Test5', children: []},
                {
                    id: 6, name: 'Test6', children: [
                        {id: 7, name: 'Test7', children: []},
                        {id: 8, name: 'Test8', children: []},
                    ],
                },
            ],
        },
        {
            id: 9,
            name: 'Test9',
            children: [
                {id: 10, name: 'Test10', children: []},
                {id: 11, name: 'Test11', children: []},
                {id: 12, name: 'Test12', children: []},
                {
                    id: 13, name: 'Test13', children: [
                        {id: 14, name: 'Test5', children: []},
                        {id: 15, name: 'Test14', children: []},
                        {
                            id: 16, name: 'Test15', children: [
                                {id: 17, name: 'Test16', children: []},
                                {id: 18, name: 'Test17', children: []},
                                {id: 19, name: 'Test18', children: []},
                            ]
                        },
                    ],
                },
            ],
        },
    ];

    const selectValue: Ref<string | number | null> = ref(selectItems[2].id);
    const selectValues: Ref<number[] | string[]> = ref([selectItems[1].id, selectItems[3].id] as number[] | string[]);
    const treeValue: Ref<number | null> = ref(tree.at(0).id);
    const selectedDate: Ref<string | null> = ref(null);
    const selectedDate2: Ref<string | null> = ref(null);

    const isDisabled: Ref<boolean> = ref(false);
    const isLoading: Ref<boolean> = ref(false);

    const buttonClicked = (): void => {
        isDisabled.value = !isDisabled.value;
        isLoading.value = !isLoading.value;
    };

    const buttonCancel = (): void => {
        isDisabled.value = false;
        isLoading.value = false;
    };

    const toastState = (): void => {
        useToast().show({
            subtitle: 'Your store was successfully updated',
            type: 'success',
        });
    };

    const toggleDialog = (): void => {
        useDialog().show({
            title: 'The Title',
            subtitle: 'Dialog subtitle',
            content: 'Here is the body of my dialog. I wil type in few stuff just to display some random info for the testing of this dialog.',
            actions: [
                {
                    label: 'Close',
                    handle: () => {
                        useDialog().hide();
                    },
                }
            ],
            // persistent: true,
            maxWidth: 'lg',
        });
    };

    const selectItem = (listItem: ListItem): void => {
        listItem.selected = !listItem.selected;
    }

    const badgeState: Ref<boolean> = ref(false);

    const showBadge = (): void => {
        badgeState.value = !badgeState.value;

        increaseBarProgress();
    }

    const tabIndex: Ref<number> = ref(0);
    const stepperIndex: Ref<number> = ref(0);

    const navigateStepper = (): void => {
        if (stepperIndex.value === 4) {
            stepperIndex.value = 0;
        } else {
            stepperIndex.value++;
        }
    };

    const barProgress: Ref<number> = ref(50);

    const increaseBarProgress = (): void => {
        if (barProgress.value <= 100) {
            barProgress.value = barProgress.value + Math.floor(Math.random() * 10);
            if (barProgress.value > 100) {
                barProgress.value = 100;
            }
        }
    };

    const dataTableMenu: DataTableMenuItem[] = [
        {
            label: 'Menu Item',
            handle: () => {
                console.log('clicked menu item');
            },
        },
        {
            label: 'Disabled Menu Item',
            color: 'success',
            disabled: (item: DataTableItem) => item.id === 2,
            handle: () => {
                console.log('clicked disabled menu item');
            },
        },
        {
            label: 'Disabled Menu Item 2',
            color: 'secondary',
            disabled: true,
            handle: () => {
                console.log('clicked disabled menu item');
            },
        },
        {
            label: 'Hidden Menu Item',
            color: 'warning',
            show: false,
            handle: () => {
                console.log('clicked hidden menu item');
            },
        },
        {
            label: 'Menu Item',
            color: 'danger',
            show: (item: DataTableItem) => item.id === 1,
            disabled: false,
            handle: () => {
                console.log('clicked menu item');
            },
        },
    ];

    const showVDialog: Ref<boolean> = ref(false);

    const otpValue: Ref<string | null> = ref(null);

    const otpUpdated = (): void => {
        console.log(otpValue.value);
    };

    watch(() => otpValue.value, (val) => {
        if (val.length === 6) {
            isLoading.value = true;
        }
    })
</script>

<template>
    <main>
        <VToolbar
            elevated
            appbar
            show-menu-button
            @click:menu-icon="drawerIsOpen = !drawerIsOpen"
        >Title on Toolbar
            <template #actions>
                <VToolbarAction>Text Action</VToolbarAction>
                <VToolbarAction>
                    <VIcon solid icon="bell-alert" color="white"/>
                    <div>Action</div>
                </VToolbarAction>
                <VMenu align="right">
                    <template #trigger>
                        <VToolbarAction>
                            <VIcon solid icon="cog-8-tooth" color="white" size="md"/>
                        </VToolbarAction>
                    </template>
                    <template #content>
                        <VListItem
                            clickable
                            :key="listItem.id"
                            :selected="listItem.selected"
                            v-for="listItem in listItems"
                            @click="toggleDialog"
                        >
                            <template #title>
                                This is {{ listItem.name }}
                            </template>
                        </VListItem>
                    </template>
                </VMenu>
            </template>
        </VToolbar>
        <VContainer appbar-offset @click="drawerIsOpen = false">
            <VDialogService/>
            <VMenu>
                <template #trigger>
                    <VButton>Menu</VButton>
                </template>
                <template #content>
                    <VListItem
                        clickable
                        color="primary"
                        :key="listItem.id"
                        :selected="listItem.selected"
                        v-for="listItem in listItems"
                        @click="toggleDialog"
                    >
                        <template #title>
                            This is {{ listItem.name }}
                        </template>
                    </VListItem>
                </template>
            </VMenu>
            <VButton @click="toggleDialog">Toggle Dialog</VButton>
        </VContainer>
    </main>
</template>