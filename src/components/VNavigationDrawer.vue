<script setup lang="ts">
    import {Link} from "@inertiajs/vue3";
    import {computed, type ComputedRef, nextTick, onMounted, type Ref, ref} from "vue";
    import VDrawer from "@/components/VDrawer.vue";
    import VIcon from "@/components/VIcon.vue";
    import type {MenuItem} from "@/component-types/MenuItem";

    interface Props {
        modelValue: boolean;
        items: MenuItem[];
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: true,
        items: () => ([]),
    });

    interface Emits {
        (event: 'update:modelValue', data: boolean): void;

        (event: 'click:link'): void;
    }

    const emits = defineEmits<Emits>();
    const pageWidth: Ref<number> = ref(innerWidth);
    const mini: ComputedRef<boolean> = computed(() => pageWidth.value >= 1206);

    const linkClicked = (): void => {
        if (innerWidth < 1280) {
            emits('click:link');
        }
    };

    const openGroupIndex: Ref<number | null> = ref(null);

    const toggleGroup = (index: number): void => {
        if (openGroupIndex.value === null) {
            openGroupIndex.value = index;
        } else {
            if (openGroupIndex.value === index) {
                openGroupIndex.value = null;
            } else {
                openGroupIndex.value = index;
            }
        }
    };

    const toggleActiveGroupOnLoad = (): void => {
        props.items.forEach((item: MenuItem, index: number) => {
            if (item.hasOwnProperty('items') && item.items.length > 0) {
                if ((item.items as MenuItem[]).some(({active}) => active as boolean)) {
                    nextTick(() => toggleGroup(index));
                }
            }
        });
    };

    onMounted((): void => {
        toggleActiveGroupOnLoad();
    });

    const getRoute = (name: string, params: string[] | number[] | object[]): string => {
        //@ts-ignore
        return route(name, params);
    }
</script>

<template>
    <VDrawer
        toolbar-offset
        :mini="mini"
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
    >
        <div class="h-[calc(100vh-56px)] group">
            <div class="grid grid-cols-1 font-medium">
                <div v-for="(item, index) in items"
                     :key="item.routeName"
                >
                    <div
                        class="flex flex-col items-center transition-all duration-100 overflow-y-hidden overflow-x-hidden"
                        :style="{ height: `${openGroupIndex === index ? ((48 * item.items.length) + 48) : 48}px` }"
                        v-if="item.hasOwnProperty('items') && item.items.length > 0"
                    >
                        <div
                            class="w-full flex justify-between items-center cursor-pointer px-4 py-3 clickable"
                            @click="toggleGroup(index)"
                        >
                            <div class="flex items-center space-x-4">
                                <VIcon :size="24"
                                       :icon="item.icon"
                                       :color="openGroupIndex === index && item.active ? 'primary' : ''"
                                />
                                <div class="whitespace-nowrap">{{ item.label }}</div>
                            </div>
                            <VIcon icon="chevron-right"
                                   class="transition-all duration-100"
                                   :color="openGroupIndex === index && item.active ? 'primary' : ''"
                                   :class="[openGroupIndex === index ? 'rotate-90' : '']"
                            />
                        </div>
                        <Link class="flex items-center w-full pr-2 py-3 transition-all duration-150"
                              :href="getRoute(groupItem.routeName, groupItem.routeParams)"
                              :key="groupItem.routeName"
                              :class="[
                                  groupItem.active ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-900 clickable',
                                  !modelValue ? 'pl-4 group-hover:pl-8' : 'pl-8',
                              ]"
                              v-for="(groupItem) in item.items"
                              @click="linkClicked"
                        >
                            <div class="flex items-center space-x-4">
                                <VIcon :size="24"
                                       :icon="groupItem.icon"
                                       :color="groupItem.active ? 'primary' : ''"
                                       :solid="groupItem.active"
                                />
                                <div class="whitespace-nowrap">{{ groupItem.label }}</div>
                            </div>
                        </Link>
                    </div>
                    <Link
                        :href="getRoute(item.routeName, item.routeParams)"
                        class="flex items-center pl-4 py-3 transition-all duration-150"
                        :class="[item.active ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-900 clickable']"
                        v-else
                        @click="linkClicked"
                    >
                        <div class="flex items-center space-x-4">
                            <VIcon :size="24"
                                   :icon="item.icon"
                                   :color="item.active ? 'primary' : ''"
                                   :solid="item.active"
                            />
                            <div class="whitespace-nowrap">{{ item.label }}</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </VDrawer>
</template>

<style scoped>

</style>
