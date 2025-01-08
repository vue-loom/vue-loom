<script setup lang="ts">
    import {MenuItem} from "./interfaces";
    import VCollapsible from "./VCollapsible.vue";
    import VCollapsibleTrigger from "./VCollapsibleTrigger.vue";
    import VCollapsibleContent from "./VCollapsibleContent.vue";
    import {ChevronDown, CornerDownRight} from 'lucide-vue-next';
    import {computed, ref} from "vue";
    import VButton from "./VButton.vue";
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
            <v-button variant="link" class="w-full h-fit flex justify-between p-0" :class="[isOpen ? 'underline' : 'text-foreground']">
                {{ item.label }}
                <ChevronDown class="text-foreground transition-all duration-150" :class="[isOpen ? 'rotate-180' : '']"/>
            </v-button>
        </v-collapsible-trigger>
        <v-collapsible-content class="relative flex flex-col gap-3">
            <div class="absolute top-0 left-0.5 w-px bg-primary" :style="{height: `${selectChildLineHeight}px`}"/>
            <div class="flex gap-1 group" :class="[childIndex === 0 ? 'mt-3' : '']" :key="child.routeName"
                 v-for="(child, childIndex) in item.items">
                <CornerDownRight class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-75"
                                 :class="[child.active ? '!opacity-100 text-primary' : '']"/>
                <div class="w-full flex flex-col gap-2">
                    <v-button class="h-fit p-0" variant="link" :class="[child.active ? 'underline' : 'text-foreground']"
                              @click="navigate(item.url)">
                        {{ child.label }}
                    </v-button>
                </div>
            </div>
        </v-collapsible-content>
    </v-collapsible>
    <v-button class="h-fit p-0" variant="link" :class="[item.active ? 'underline' : 'text-foreground']" v-else
              @click="navigate(item.url)">
        {{ item.label }}
    </v-button>
</template>

<style scoped>

</style>