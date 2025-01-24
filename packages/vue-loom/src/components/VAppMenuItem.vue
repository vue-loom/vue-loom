<script setup lang="ts">
    import {MenuItem} from "./interfaces";
    import {ChevronDown, CornerDownRight} from 'lucide-vue-next';
    import {computed, ref} from "vue";
    import {navigate} from "@vue-loom/utils";
    import VBadge from "./VBadge.vue";
    import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "./ui/collapsible";

    interface Props {
        item: MenuItem,
    }

    const props = defineProps<Props>();
    const childIsActive = computed<boolean>(() => props.item.items?.length ? props.item.items.findIndex(({active}) => active) !== -1 : false);
    const isOpen = ref<boolean>(childIsActive.value);
    const selectedChildLineHeight = computed<number>(() => {
        if (props.item.items?.length) {
            const activeIndex = props.item.items.findIndex(({active}) => active);

            if (activeIndex !== -1) {
                if (activeIndex === 0) {
                    return 12 + 4;
                }

                return 12 + (activeIndex * (24 + 12)) + 4;
            }

            return 0;
        }

        return 0;
    });
</script>

<template>
    <Collapsible class="flex flex-col" v-model:open="isOpen" v-if="item.hasOwnProperty('items') && item.items?.length">
        <CollapsibleTrigger as-child>
            <div class="flex justify-between cursor-pointer"
                 :class="[isOpen ? 'font-bold' : 'text-muted-foreground', childIsActive ? 'text-primary' : '']">
                {{ item.label }}
                <ChevronDown class="text-foreground transition-all duration-150" :class="[isOpen ? 'rotate-180' : '']"/>
            </div>
        </CollapsibleTrigger>
        <CollapsibleContent class="relative flex flex-col gap-3">
            <div class="absolute top-0 left-0.5 w-[3px] bg-primary border-r border-white z-10"
                 :style="{height: `${selectedChildLineHeight}px`}"/>
            <div class="flex gap-1 group" :class="[childIndex === 0 ? 'mt-3' : '']" :key="child.url"
                 v-for="(child, childIndex) in item.items">
                <CornerDownRight class="w-5 h-5 text-primary" v-if="child.active"/>
                <CornerDownRight class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-75" v-else/>
                <div class="w-full flex justify-between items-center gap-2 cursor-pointer"
                     :class="[child.active ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground']"
                     @click="navigate(child.url || '/')">
                    <div>{{ child.label }}</div>
                    <v-badge class="leading-none px-1.5 pb-px pt-0.5" v-if="child.badge">{{ child.badge }}</v-badge>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
    <div class="w-full flex justify-between items-center gap-2 cursor-pointer"
         :class="[item.active ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground']"
         @click="navigate(item.url || '/')" v-else>
        <div>{{ item.label }}</div>
        <v-badge class="leading-none px-1.5 pb-px pt-0.5" v-if="item.badge">{{ item.badge }}</v-badge>
    </div>
</template>

<style scoped>

</style>