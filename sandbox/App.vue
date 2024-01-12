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
    } from "../src";
    import {Ref, ref} from "vue";
    import {useToast} from "../src/composables/toast";
    import {useDialog} from "../src/composables/dialog";
    import VChip from "@/components/VChip.vue";
    import {TreeItem} from "@/component-types/TreeItem";
    import {SelectItem} from "@/component-types/SelectItem";

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
            persistent: true,
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
    const barProgress: Ref<number> = ref(50);

    const increaseBarProgress = (): void => {
        if (barProgress.value <= 100) {
            barProgress.value = barProgress.value + Math.floor(Math.random() * 10);
            if (barProgress.value > 100) {
                barProgress.value = 100;
            }
        }
    };
</script>

<template>
    <main class="bg-gray-100">
        <VDialogService/>
        <VToastService appbar-offset/>

        <VToolbar appbar show-menu-button @click:menu-icon="drawerIsOpen = !drawerIsOpen">
            Title on Toolbar
            <template #actions>
                <VTooltip>
                    <template #trigger>
                        actions
                    </template>
                    <template #content>This is the actions suffix to add buttons</template>
                </VTooltip>
            </template>
        </VToolbar>

        <div class="transition-all duration-150" :class="[drawerIsOpen ? 'pl-0 xl:pl-80' : 'pl-0 xl:pl-16']">
            <VDrawer mini appbar-offset v-model="drawerIsOpen">
                This is a drawer
            </VDrawer>

            <VContainer appbar-offset @click="drawerIsOpen = false">
                <VCard color="red-500">
                    <template #title>
                        Page Title
                    </template>
                    <template #subtitle>
                        This is my subtitle
                    </template>
                    <template #content>
                        <div class="flex flex-wrap gap-4">
                            <VBanner class="col-span-3" type="error">This is my banner</VBanner>

                            <div class="w-full">
                                <VTextField
                                    class="w-1/3"
                                    label="This is a very long label for my input"
                                    v-model="value"
                                />
                            </div>

                            <div class="w-full">
                                <VTextArea
                                    class="w-2/3"
                                    label="Medium label"
                                    v-model="myValue"
                                />
                            </div>

                            <div class="w-full">
                                <VSelect
                                    searchable
                                    class="w-1/3"
                                    label="Select a Month"
                                    color="primary"
                                    :items="selectItems"
                                    v-model="selectValue"
                                />
                            </div>

                            <div class="w-full">
                                <VMultiSelect
                                    searchable
                                    class="w-1/3"
                                    label="Multi select a Value"
                                    :items="selectItems"
                                    v-model="selectValues"
                                />
                            </div>

                            <div class="w-full">
                                <VTreeSelect
                                    searchable
                                    class="w-1/3"
                                    label="Select a Value"
                                    color="primary"
                                    :items="tree"
                                    v-model="treeValue"
                                />
                            </div>

                            <VToggle
                                class="w-full"
                                label="Turn radio on"
                                color="primary"
                                v-model="toggle"
                            />

                            <div class="w-full">
                                <VTimePicker
                                    class="w-1/3"
                                    label="Time of arrival"
                                    :increment-minutes-amount="30"
                                    v-model="time"
                                />
                            </div>

                            <VCheckbox
                                class="w-full"
                                label="Do you carry firearms"
                                true-value="Yes"
                                false-value="No"
                                v-model="checkValue"
                            />

                            <div class="w-full">
                                <VDateField
                                    class="w-1/3"
                                    label="Date of Birth"
                                    v-model="selectedDate"
                                    :format="'DD-MMMM-YYYY'"
                                />
                            </div>

                            <div class="w-full">
                                <VLoader width="sm" color="success"/>
                            </div>

                            <div class="w-full">
                                <VProgressBar class="w-2/3" :max="100" v-model="barProgress"/>
                                <VProgressBar class="mt-4" type="circular" :max="100" v-model="barProgress"/>
                            </div>

                            <div class="w-full flex space-x-3 mt-4">
                                <VBadge color="warning">
                                    <template #component>
                                        <VButton @click="showBadge()">Badge</VButton>
                                    </template>
                                    <template #content>BETA</template>
                                </VBadge>

                                <VTooltip>
                                    <template #trigger>
                                        <VButton @click="toastState()">Show Toast</VButton>
                                    </template>
                                    <template #content>Click to display the toast.</template>
                                </VTooltip>

                                <VButton @click="toggleDialog()" color="secondary">Show Dialog</VButton>

                                <VMenu position="top" :close-on-content-click="false">
                                    <template #trigger>
                                        <VButton color="secondary">Menu</VButton>
                                    </template>
                                    <template #content>
                                        <VListItem v-for="listItem in listItems"
                                                   :key="listItem.id"
                                                   clickable
                                                   :selected="listItem.selected"
                                                   @click="selectItem(listItem)"
                                        >
                                            <template #title>
                                                This is {{ listItem.name }}
                                            </template>
                                        </VListItem>
                                    </template>
                                </VMenu>
                            </div>

                            <div class="w-full mt-4">
                                <VTag class="w-fit" color="accent">
                                    <template #content>TAG</template>
                                </VTag>
                            </div>

                            <div class="mt-4 flex space-x-3">
                                <VChip>Chip</VChip>
                                <VChip color="success">Chip with color</VChip>
                                <VChip closable color="primary">Closeable chip with color</VChip>
                                <VChip closable disabled color="danger">Disabled chip</VChip>
                            </div>

                            <div class="w-full flex space-x-2 mt-4">
                                <VIcon icon="identification" color="primary" size="xs" solid/>
                                <VIcon icon="identification" color="primary" size="xs"/>
                                <VIcon icon="banknotes" color="secondary" size="sm" solid/>
                                <VIcon icon="banknotes" color="secondary" size="sm"/>
                                <VIcon icon="bell-alert" color="success" size="md" solid/>
                                <VIcon icon="bell-alert" color="success" size="md"/>
                                <VIcon icon="cake" color="warning" size="lg" solid/>
                                <VIcon icon="cake" color="warning" size="lg"/>
                                <VIcon icon="folder-arrow-down" color="danger" size="xl" solid/>
                                <VIcon icon="folder-arrow-down" color="danger" size="xl"/>
                                <VIcon icon="phone-x-mark" color="accent" :size="150"/>
                            </div>
                        </div>
                    </template>
                    <template #actions>
                        <VButton @click="buttonCancel()" color="secondary">Cancel</VButton>

                        <VButton @click="buttonClicked()" :disabled="isDisabled" :loading="isLoading">Next</VButton>
                    </template>
                </VCard>

                <VCard clickable hover class="mt-4">
                    <template #title>This is a clickable card</template>
                    <template #content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </template>
                </VCard>

                <VTabs class="mt-4" grow-tabs v-model="tabIndex" elevation>
                    <VTab>
                        <template #tab>Tab One</template>
                        <template #content>
                            <div>
                                This is the content of tab one
                                <VButton>Text</VButton>
                            </div>
                        </template>
                    </VTab>
                    <VTab>
                        <template #tab>
                            Tab two
                        </template>
                        <template #content>
                            <div>
                                <div>This is the second tab content with element div</div>
                                <div>This is the second tab content with element div</div>
                                <div>This is the second tab content with element div</div>
                                <div>This is the second tab content with element div</div>
                                <div>This is the second tab content with element div</div>
                                <div>This is the second tab content with element div</div>
                            </div>
                        </template>
                    </VTab>
                    <VTab>
                        <template #tab>
                            Tab three
                        </template>
                        <template #content>
                            <div>
                                <div>This is the third tab content with element div</div>
                                <div>This is the third tab content with element div</div>
                                <div>This is the third tab content with element div</div>
                                <div>This is the third tab content with element div</div>
                            </div>
                        </template>
                    </VTab>
                    <VTab>
                        <template #tab>
                            Tab four
                        </template>
                        <template #content>
                            <div>
                                <div>This is the fourth tab content with element div</div>
                            </div>
                        </template>
                    </VTab>
                    <VTab>
                        <template #tab>
                            Tab five
                        </template>
                        <template #content>
                            <VButton>This works</VButton>
                        </template>
                    </VTab>
                </VTabs>

                <VStepper class="mt-4" clickable preserve-state v-model="tabIndex" elevation>
                    <VStep>
                        <template #step>
                            Step One
                        </template>
                        <template #content>
                            The first step is to move to step two!
                        </template>
                    </VStep>
                    <VStep>
                        <template #step>
                            Step Two
                        </template>
                        <template #content>
                            The second step is to move to step three!
                        </template>
                    </VStep>
                    <VStep>
                        <template #step>
                            Step Three
                        </template>
                        <template #content>
                            This is the last step. Weldon!!
                        </template>
                    </VStep>
                </VStepper>

                <VExpansionPanels class="mt-4" :open="[false, true, false]">
                    <VExpansionPanel :key="index" v-for="(item, index) in listItems">
                        <template #title>
                            Option {{ item.id }}
                        </template>
                        <template #subtitle>
                            This is the subtitle for option {{ item.id }}
                        </template>
                        <template #content>
                            <div class="p-2">This is {{ item.name }}</div>
                            <div class="p-2">This is {{ item.name }}</div>
                            <div class="p-2">This is {{ item.name }}</div>
                            <div class="p-2">This is {{ item.name }}</div>
                        </template>
                    </VExpansionPanel>
                </VExpansionPanels>
            </VContainer>
        </div>
    </main>
</template>