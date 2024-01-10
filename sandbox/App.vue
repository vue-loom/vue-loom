<script setup lang="ts">
    import STextField from '../src/components/STextField.vue'
    import VStepper from "@/components/Stepper/VStepper.vue";
    import VStep from "@/components/Stepper/VStep.vue";
    import VTab from "@/components/Tab/VTab.vue";
    import VTabs from "@/components/Tab/VTabs.vue";
    import SButton from "@/components/SButton.vue";
    import SIcon from "@/components/SIcon.vue";

</script>

<template>
    <main>
        <h1>Welcome to your sandbox environment</h1>

        <STextField
            class="w-full"
            label="This is a very long label for my input"
            :model-value="''"
        />

        <VStepper class="mt-4" clickable preserve-state elevation>
            <VStep>
                <template #step>
                    <div>Step One</div>
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

        <VTabs class="mt-4" grow-tabs elevation>
            <VTab>
                <template #tab>Tab One</template>
                <template #content>
                    <div>
                        This is the content of tab one
                        <SButton>Text</SButton>
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
                    <SButton>This works</SButton>
                </template>
            </VTab>
        </VTabs>

        <SIcon icon="plus"/>
    </main>
</template>

<style lang="scss" scoped>

</style>