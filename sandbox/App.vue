<script setup lang="ts">
    import VTextField from '../src/components/VTextField.vue'
    import VStepper from "../src/components/Stepper/VStepper.vue";
    import VStep from "../src/components/Stepper/VStep.vue";
    import VTab from "../src/components/Tab/VTab.vue";
    import VTabs from "../src/components/Tab/VTabs.vue";
    import VButton from "../src/components/VButton.vue";
    import VIcon from "../src/components/VIcon.vue";
</script>

<template>
    <main>
        <h1 class="bg-blue-600 text-9xl">Welcome to your your sandbox environment</h1>

        <VTextField
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

        <VIcon icon="plus"/>
    </main>
</template>