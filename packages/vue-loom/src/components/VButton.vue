<script setup lang="ts">
    import {Button, buttonVariants, type ButtonVariants} from "./ui/button";
    import {computed, type ComputedRef, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";
    import {type PrimitiveProps} from "radix-vue";
    import {Loader2} from "lucide-vue-next";

    interface Props extends PrimitiveProps {
        color?: 'primary' | 'secondary' | 'destructive' | 'accent' | 'muted',
        variant?: 'default' | 'outline' | 'ghost' | 'link',
        size?: ButtonVariants['size'],
        loading?: boolean,
        class?: HTMLAttributes['class'],
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'primary',
        variant: 'default',
        loading: false,
    });

    const getMergedColorClassesForVariant = (classes: string) => cn(buttonVariants({variant: props.variant}), classes);

    const buttonTheme: ComputedRef<string> = computed(() => ({
        primary: {
            default: getMergedColorClassesForVariant('bg-primary text-primary-foreground hover:bg-primary/90'),
            outline: getMergedColorClassesForVariant('bg-[inherit] border-primary text-primary hover:bg-primary/10 hover:text-primary'),
            ghost: getMergedColorClassesForVariant('bg-transparent text-primary hover:bg-primary/10 hover:text-primary'),
            link: getMergedColorClassesForVariant('bg-transparent text-primary hover:bg-transparent'),
        }[props.variant],
        secondary: {
            default: getMergedColorClassesForVariant('bg-secondary text-secondary-foreground hover:bg-secondary/90'),
            outline: getMergedColorClassesForVariant('bg-[inherit] border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary'),
            ghost: getMergedColorClassesForVariant('bg-transparent text-secondary hover:bg-secondary/10 hover:text-secondary'),
            link: getMergedColorClassesForVariant('bg-transparent text-secondary hover:bg-transparent'),
        }[props.variant],
        destructive: {
            default: getMergedColorClassesForVariant('bg-destructive text-destructive-foreground hover:bg-destructive/90'),
            outline: getMergedColorClassesForVariant('bg-[inherit] border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive'),
            ghost: getMergedColorClassesForVariant('bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive'),
            link: getMergedColorClassesForVariant('bg-transparent text-destructive hover:bg-transparent'),
        }[props.variant],
        accent: {
            default: getMergedColorClassesForVariant('bg-accent text-accent-foreground hover:bg-accent/90'),
            outline: getMergedColorClassesForVariant('bg-[inherit] border-accent text-accent hover:bg-accent/10 hover:text-accent'),
            ghost: getMergedColorClassesForVariant('bg-transparent text-accent hover:bg-accent/10 hover:text-accent'),
            link: getMergedColorClassesForVariant('bg-transparent text-accent hover:bg-transparent'),
        }[props.variant],
        muted: {
            default: getMergedColorClassesForVariant('bg-muted text-muted-foreground hover:bg-muted/90'),
            outline: getMergedColorClassesForVariant('bg-[inherit] border-muted text-muted hover:bg-muted/10 hover:text-muted'),
            ghost: getMergedColorClassesForVariant('bg-transparent text-muted hover:bg-muted/10 hover:text-muted'),
            link: getMergedColorClassesForVariant('bg-transparent text-muted hover:bg-transparent'),
        }[props.variant],
    }[props.color]));
</script>

<template>
    <Button :disabled="loading" :class="cn(`relative w-fit select-none ${buttonTheme} ${loading ? 'text-transparent' : ''}`, props.class)">
        <slot/>
        <div v-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 class="w-5 h-5 animate-spin" :class="[variant === 'default' ? `text-${color}-foreground` : `text-${color}`]"/>
        </div>
    </Button>
</template>

<style scoped>

</style>
