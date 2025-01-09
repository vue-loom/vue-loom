<script setup lang="ts">
    import {MenuItem} from "./interfaces";
    import VCollapsible from "./VCollapsible.vue";
    import VCollapsibleTrigger from "./VCollapsibleTrigger.vue";
    import VCollapsibleContent from "./VCollapsibleContent.vue";
    import {ChevronDown, CornerDownRight} from 'lucide-vue-next';
    import {computed, ref} from "vue";
    import {navigate} from "@vue-loom/utils";

    interface Props {
        item: MenuItem,
    }

    const props = defineProps<Props>();
    const isOpen = ref<boolean>();
    const selectChildLineHeight = computed<number>(() => {
        if (props.item.items?.length) {
            const activeIndex = props.item.items.findIndex(({active}) => active);

            if (activeIndex !== -1) {
                return ((activeIndex + 1) * 20) + 12;
            }

            return 0;
        }

        return 0;
    });
</script>

<template>
    <v-collapsible class="flex flex-col" v-model:open="isOpen" v-if="item.hasOwnProperty('items') && item.items?.length">
        <v-collapsible-trigger as-child>
            <div class="flex justify-between cursor-pointer" :class="[isOpen ? 'text-primary' : 'text-muted-foreground']">
                {{ item.label }}
                <ChevronDown class="text-foreground transition-all duration-150" :class="[isOpen ? 'rotate-180' : '']"/>
            </div>
        </v-collapsible-trigger>
        <v-collapsible-content class="relative flex flex-col gap-3">
            <div class="absolute top-0 left-0.5 w-[3px] bg-primary border-r border-white z-10" :style="{height: `${selectChildLineHeight}px`}"/>
            <div class="flex gap-1 group" :class="[childIndex === 0 ? 'mt-3' : '']" :key="child.routeName"
                 v-for="(child, childIndex) in item.items">
                <CornerDownRight class="w-5 h-5 text-primary" v-if="child.active"/>
                <CornerDownRight class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-75" v-else/>
                <div class="w-full flex flex-col gap-2">
                    <div class="cursor-pointer" :class="[child.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground']" @click="navigate(child.url)">
                        {{ child.label }}
                    </div>
                </div>
            </div>
        </v-collapsible-content>
    </v-collapsible>
    <div class="cursor-pointer" :class="[item.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground']" @click="navigate(item.url)" v-else>
        {{ item.label }}
    </div>
</template>

<style scoped>

</style>