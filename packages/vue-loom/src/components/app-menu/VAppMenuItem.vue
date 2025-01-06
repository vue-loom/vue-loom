<script setup lang="ts">
    import {MenuItem} from "./interfaces.ts";
    import {navigate} from "../../navigation/navigation";
    import VCollapsible from "../VCollapsible.vue";
    import VCollapsibleTrigger from "../VCollapsibleTrigger.vue";
    import VCollapsibleContent from "../VCollapsibleContent.vue";
    import {ChevronDown} from 'lucide-vue-next';
    import {ref} from "vue";

    interface Props {
        item: MenuItem,
    }

    defineProps<Props>();

    const isOpen = ref<boolean>();

    const goToPage = (item: MenuItem) => {
        navigate(item.routeName);
    };
</script>

<template>
    <v-collapsible class="flex flex-col" v-model:open="isOpen" v-if="item.hasOwnProperty('items') && item.items?.length">
        <v-collapsible-trigger
            class="w-full flex justify-between text-start text-foreground rounded-[var(--radius)] cursor-pointer px-3 py-2 hover:underline transition-all duration-75"
            :class="[isOpen ? 'underline' : '']"
        >{{ item.label }}
            <ChevronDown class="text-foreground transition-all duration-150" :class="[isOpen ? 'rotate-180' : '']"/>
        </v-collapsible-trigger>
        <v-collapsible-content class="flex ml-3">
            <div class="w-1.5 bg-accent rounded-full" :style="{height: `${(item.items.length * 40) + ((item.items.length - 1) * 8)}px`}"/>
            <div class="w-full flex flex-col gap-2">
                <div
                    class="flex items-center gap-2 text-foreground rounded-[var(--radius)] cursor-pointer px-3 py-2 hover:underline transition-all duration-75"
                    :class="[child.active ? 'underline text-primary' : '']"
                    v-for="(child) in item.items"
                    @click="goToPage(child)"
                >{{ child.label }}
                </div>
            </div>
        </v-collapsible-content>
    </v-collapsible>
    <div
        class="flex items-center gap-2 text-foreground rounded-[var(--radius)] cursor-pointer px-3 py-2 hover:underline transition-all duration-75"
        :class="[item.active ? 'underline text-primary' : '']"
        v-else
        @click="goToPage(item)"
    >{{ item.label }}
    </div>
</template>

<style scoped>

</style>