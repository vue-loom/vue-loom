<script setup lang="ts">
const open = ref(false);
const pin = ref('');
const name: Ref<string> = ref('');
const tc: Ref<boolean> = ref(true);
const accordion = ref(['item_1']);
const count = ref(5);
const fruits = [
      {
          id: 1,
            name: 'Apple',
        },
    {
        id: 2,
            name: 'Orange',
        },
    {
        id: 3,
            name: 'Banana',
        }
];
const fruitId = ref();
const selectedFruit = ref([2]);
const frameworks = [
      {value: 'next.js', label: 'Next.js'},
      {value: 'sveltekit', label: 'SvelteKit'},
      {value: 'nuxt', label: 'Nuxt'},
      {value: 'remix', label: 'Remix'},
      {value: 'astro', label: 'Astro'},
  ];
const framework = ref(null);
const cars = ref([]);
const sliderVal = ref([50]);
const steps = [{
    step: 1,
        title: 'Address',
        description: 'Add your address here',
        icon: BookUser,
    }, {
      step: 2,
          title: 'Shipping',
          description: 'Set your preferred shipping method',
          icon: Truck,
      }, {
      step: 3,
          title: 'Payment',
          description: 'Add any payment information you have',
          icon: CreditCard,
      }, {
      step: 4,
          title: 'Checkout',
          description: 'Confirm your order',
          icon: Check,
      }]
</script>

<template>
  <div class="flex flex-col gap-6">
      <v-card>
          <v-navigation-menu>
              <v-navigation-menu-list class="flex gap-x-6">
                  <v-navigation-menu-item>
                      <v-navigation-menu-link>Home</v-navigation-menu-link>
                  </v-navigation-menu-item>
                  <v-navigation-menu-item>
                      <v-navigation-menu-link>Contact Us</v-navigation-menu-link>
                  </v-navigation-menu-item>
                  <v-navigation-menu-item>
                      <v-navigation-menu-link>About Us</v-navigation-menu-link>
                  </v-navigation-menu-item>
              </v-navigation-menu-list>
          </v-navigation-menu>
      </v-card>
    <div class="flex gap-6">
          <v-card class="grow">
              <v-card-footer class="justify-center">
                  <v-button variant="outline">Click Me</v-button>
                  <v-button>Click Me</v-button>
              </v-card-footer>
              <v-card-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus, arcu non pellentesque aliquam,
                  nisl tellus
                  volutpat metus, quis consequat risus urna eget elit. Maecenas vehicula nisl vitae vulputate pulvinar.
                  Proin tristique
                  erat eget lacus hendrerit luctus. Donec lectus nulla, rhoncus id nisi scelerisque, blandit sodales
                  tellus.
              </v-card-content>
              <v-card-header>
                  <v-card-description>This is a card description</v-card-description>
                  <v-card-title>This is a cart title</v-card-title>
              </v-card-header>
          </v-card>
        <v-card>
              <v-range-calendar/>
          </v-card>
        <v-card class="grow">
              <v-toggle>
                  Toggle
              </v-toggle>
            <v-toggle-group>
                  <v-toggle-group-item value="item_1">
                      Item 1
                  </v-toggle-group-item>
                  <v-toggle-group-item value="item_2">
                      Item 2
                  </v-toggle-group-item>
                  <v-toggle-group-item value="item_3">
                      Item 3
                  </v-toggle-group-item>
              </v-toggle-group>
            <v-number-field v-model="count">
                  <v-number-field-content>
                      <v-number-field-decrement/>
                      <v-number-field-input/>
                      <v-number-field-increment/>
                  </v-number-field-content>
              </v-number-field>
            <v-hover-card>
                  <v-hover-card-trigger>Hover Me</v-hover-card-trigger>
                  <v-hover-card-content>
                      Hover card content
                  </v-hover-card-content>
              </v-hover-card>
            <v-hover-card>
                  <template #trigger>
                      Hover Me Slot
                  </template>
                  <v-hover-card-content>
                      Hover card content
                  </v-hover-card-content>
              </v-hover-card>
            <v-dialog>
                  <v-dialog-trigger as-child>
                      <v-button>Dialog</v-button>
                  </v-dialog-trigger>
                  <v-dialog-content>
                      <v-dialog-header>
                          <v-dialog-title>Dialog Title</v-dialog-title>
                          <v-dialog-description>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus, arcu non pellentesque aliquam.
                          </v-dialog-description>
                      </v-dialog-header>
                      <div class="flex flex-col gap-6">
                          <v-input label="Value 1" model-value="Test"/>
                          <v-input label="Value 2" model-value="Test"/>
                      </div>
                      <v-dialog-footer>
                          <v-dialog-close as-child>
                              <v-button>Save Changes</v-button>
                          </v-dialog-close>
                      </v-dialog-footer>
                  </v-dialog-content>
              </v-dialog>
          </v-card>
      </div>
    <v-card>
          <v-row class="mb-3">
              <v-col>
                  <v-label class="mb-2">Primary Default Button</v-label>
                  <v-button loading>Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Secondary Default Button</v-label>
                  <v-button disabled color="secondary">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Destructive Default Button</v-label>
                  <v-button color="destructive">Click Me</v-button>
              </v-col>
          </v-row>
        <v-row class="mb-3">
              <v-col>
                  <v-label class="mb-2">Primary Outline Button</v-label>
                  <v-button variant="outline">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Secondary Outline Button</v-label>
                  <v-button color="secondary" variant="outline">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Destructive Outline Button</v-label>
                  <v-button color="destructive" variant="outline">Click Me</v-button>
              </v-col>
          </v-row>
        <v-row class="mb-3">
              <v-col>
                  <v-label class="mb-2">Primary Ghost Button</v-label>
                  <v-button loading variant="ghost">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Secondary Ghost Button</v-label>
                  <v-button color="secondary" variant="ghost">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Destructive Ghost Button</v-label>
                  <v-button color="destructive" variant="ghost">Click Me</v-button>
              </v-col>
          </v-row>
        <v-row class="mb-3">
              <v-col>
                  <v-label class="mb-2">Primary Link Button</v-label>
                  <v-button variant="link">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Secondary Link Button</v-label>
                  <v-button color="secondary" variant="link">Click Me</v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Destructive Link Button</v-label>
                  <v-button color="destructive" variant="link">Click Me</v-button>
              </v-col>
          </v-row>
        <v-row class="mb-3">
              <v-col>
                  <v-label class="mb-2">Primary Icon Button</v-label>
                  <v-button>
                      <ChevronRight/>
                  </v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Secondary Icon Button</v-label>
                  <v-button color="secondary">
                      <ChevronRight/>
                  </v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Destructive Icon Button</v-label>
                  <v-button color="destructive">
                      <ChevronRight/>
                  </v-button>
              </v-col>
          </v-row>
        <v-row class="mb-3">
              <v-col>
                  <v-label class="mb-2">Primary Icon Outline Button</v-label>
                  <v-button variant="outline">
                      <ChevronRight/>
                  </v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Secondary Icon Outline Button</v-label>
                  <v-button color="secondary" variant="outline">
                      <ChevronRight/>
                  </v-button>
              </v-col>
              <v-col>
                  <v-label class="mb-2">Destructive Icon Outline Button</v-label>
                  <v-button color="destructive" variant="outline">
                      <ChevronRight/>
                  </v-button>
              </v-col>
          </v-row>
        <v-row>
              <v-col>
                  <v-input v-model="name" label="Name" placeholder="Eg. Jane Doe"
                                                         error-message="This field is required." readonly></v-input>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VTextarea v-model="name" label="Name" placeholder="Eg. Jane Doe"
                                                             error-message="This field is required."></VTextarea>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VSelect placeholder="Select Fruit"
                                                         label="Fruit"
                                                         class="w-96"
                                                         :items="fruits"
                                                         item-text="name"
                                                         item-value="id"
                                                         v-model="fruitId"
                                                         error-message="This field is required."
                                                />
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VCheckbox label="This is a checkbox" v-model="tc"/>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VSwitch label="This is a switch" v-model="tc"/>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  {{ tc }}
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VPopover>
                      <VPopoverTrigger as-child>
                          <VButton variant="outline">
                              Open popover
                          </VButton>
                      </VPopoverTrigger>
                      <VPopoverContent class="w-80">
                          <div class="grid gap-4">
                              <div class="space-y-2">
                                  <h4 class="font-medium leading-none">
                                      Dimensions
                                  </h4>
                                  <p class="text-sm text-muted-foreground">
                                      Set the dimensions for the layer.
                                  </p>
                              </div>
                              <div>
                                  <VLabel for="width">Add inputs for dimensions here</VLabel>
                              </div>
                          </div>
                      </VPopoverContent>
                  </VPopover>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VCommand class="rounded-lg border shadow-md max-w-[450px]">
                      <VCommandInput placeholder="Type a command or search..."/>
                      <VCommandList>
                          <VCommandEmpty>No results found.</VCommandEmpty>
                          <VCommandGroup heading="Suggestions">
                              <VCommandItem value="calendar">
                                  Calendar
                              </VCommandItem>
                              <VCommandItem value="search-emoji">
                                  Search Emoji
                              </VCommandItem>
                              <VCommandItem value="calculator">
                                  Calculator
                              </VCommandItem>
                          </VCommandGroup>
                          <VCommandSeparator/>
                          <VCommandGroup heading="Settings">
                              <VCommandItem value="profile">
                                  Profile
                              </VCommandItem>
                              <VCommandItem value="billing">
                                  Billing
                              </VCommandItem>
                              <VCommandItem value="settings">
                                  Settings
                              </VCommandItem>
                          </VCommandGroup>
                      </VCommandList>
                  </VCommand>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VCombobox v-model="framework" :items="frameworks" item-text="label" item-value="value" label="Framework"/>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  {{ framework }}
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VTagsInput v-model="cars" placeholder="Cars..." label="Cars"/>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VMultiSelect placeholder="Select some fruit" label="Multi Select" class="w-[300px]" :items="fruits" v-model="selectedFruit"/>
              </v-col>
          </v-row>
          <v-row>
              <v-col>
                  <VRadioGroup :items="frameworks" item-text="label" item-value="value"/>
              </v-col>
          </v-row>
        <v-row>
              <v-col>
                  <VStepper>
                      <VStepperItem
                            v-for="item in steps"
                            :key="item.step"
                            class="basis-1/4"
                            :step="item.step"
                        >
                          <VStepperTrigger>
                              <VStepperIndicator>
                                  <component :is="item.icon" class="w-4 h-4"/>
                              </VStepperIndicator>
                              <div class="flex flex-col">
                                  <VStepperTitle>
                                      {{ item.title }}
                                  </VStepperTitle>
                                  <VStepperDescription>
                                      {{ item.description }}
                                  </VStepperDescription>
                              </div>
                          </VStepperTrigger>
                          <VStepperSeparator
                                v-if="item.step !== steps[steps.length - 1].step"
                                class="w-full h-px"
                            />
                      </VStepperItem>
                  </VStepper>
              </v-col>
          </v-row>
      </v-card>
    <div class="flex gap-6">
          <v-alert>
              <Terminal class="w-4 h-4"/>
              <v-alert-title>This is a custom alert!</v-alert-title>
              <v-alert-description>Laoreet dictum. Integer dictum gravida leo in ullamcorper. Quisque ac erat libero.
              </v-alert-description>
          </v-alert>
        <v-alert variant="destructive">
              <Terminal class="w-4 h-4"/>
              <v-alert-title>This is a custom alert!</v-alert-title>
              <v-alert-description>Laoreet dictum. Integer dictum gravida leo in ullamcorper. Quisque ac erat libero.
              </v-alert-description>
          </v-alert>
      </div>
    <div class="flex gap-6">
          <v-card class="basis-1/3">
              <v-alert-dialog>
                  <v-alert-dialog-trigger as-child>
                      <v-button>Alert</v-button>
                  </v-alert-dialog-trigger>
                  <v-alert-dialog-content>
                      <v-alert-dialog-header>
                          <v-alert-dialog-title>Title</v-alert-dialog-title>
                          <v-alert-dialog-description>
                              Laoreet dictum. Integer dictum gravida leo in ullamcorper. Quisque ac erat libero.
                          </v-alert-dialog-description>
                      </v-alert-dialog-header>
                      <v-alert-dialog-footer>
                          <v-alert-dialog-cancel>Cancel</v-alert-dialog-cancel>
                          <v-alert-dialog-action>Continue</v-alert-dialog-action>
                      </v-alert-dialog-footer>
                  </v-alert-dialog-content>
              </v-alert-dialog>
            <v-pin-input error-message="This is an error" label="Enter your OTP" v-model="pin"/>
          </v-card>
        <v-card class="basis-1/3">
              <v-accordion type="multiple" v-model="accordion">
                  <v-accordion-item value="item_1" class="bg-blue-500">
                      <v-accordion-trigger>This is the 1st item</v-accordion-trigger>
                      <v-accordion-content class="bg-green-500">
                          Laoreet dictum. Integer dictum gravida leo in ullamcorper. Quisque ac erat libero.
                      </v-accordion-content>
                  </v-accordion-item>
                  <v-accordion-item value="item_2">
                      <v-accordion-trigger>This is the 2nd item</v-accordion-trigger>
                      <v-accordion-content>
                          Laoreet dictum. Integer dictum gravida leo in ullamcorper. Quisque ac erat libero.
                      </v-accordion-content>
                  </v-accordion-item>
                  <v-accordion-item value="item_3">
                      <v-accordion-trigger>This is the 3rd item</v-accordion-trigger>
                      <v-accordion-content>
                          Laoreet dictum. Integer dictum gravida leo in ullamcorper. Quisque ac erat libero.
                      </v-accordion-content>
                  </v-accordion-item>
              </v-accordion>
          </v-card>
        <v-card class="basis-1/3">
              <div class="h-8 flex gap-6">
                  <v-separator orientation="vertical"/>
                  <v-separator orientation="vertical"/>
                  <v-separator orientation="vertical"/>
              </div>
              <div class="py-4">
                  <v-separator/>
              </div>
              <div class="py-4">
                  <v-separator label="or"/>
              </div>
          </v-card>
      </div>
    <div class="flex gap-6">
          <v-card class="basis-1/3">
              <v-progress :model-value="25"/>
              <VSlider v-model="sliderVal" :max="100" :step="1"></VSlider>
          </v-card>
        <v-card class="basis-1/3 flex flex-row gap-6">
              <v-avatar class="bg-primary">
                  <v-avatar-image src="/images/logo.svg"/>
              </v-avatar>
              <v-avatar class="text-primary-foreground bg-destructive">
                  <v-avatar-image src="/images/broken.svg"/>
                  <v-avatar-fallback>
                      <p class="h-full bg-white rounded-full text-black p-1.5 font-semibold">JD</p>
                  </v-avatar-fallback>
              </v-avatar>
          </v-card>
        <v-card class="basis-1/3">
              <v-badge variant="destructive">1</v-badge>
          </v-card>
      </div>
    <div class="flex gap-6">
          <v-card class="basis-1/3 flex flex-row gap-6">
              <v-dropdown-menu>
                  <v-dropdown-menu-trigger as-child>
                      <v-button>My Profile</v-button>
                  </v-dropdown-menu-trigger>
                  <v-dropdown-menu-content>
                      <v-dropdown-menu-label>My Profile</v-dropdown-menu-label>
                      <v-dropdown-menu-separator/>
                      <v-dropdown-menu-item>Test 1</v-dropdown-menu-item>
                      <v-dropdown-menu-item>Test 2</v-dropdown-menu-item>
                      <v-dropdown-menu-item>Test 3</v-dropdown-menu-item>
                  </v-dropdown-menu-content>
              </v-dropdown-menu>
            <v-tooltip-provider>
                  <v-tooltip>
                      <v-tooltip-trigger as-child>
                          <v-button>Tooltip</v-button>
                      </v-tooltip-trigger>
                      <v-tooltip-content>
                          This is a tooltip
                      </v-tooltip-content>
                  </v-tooltip>
              </v-tooltip-provider>
          </v-card>
        <v-card class="basis-1/3 flex flex-row gap-6">
              <v-sheet>
                  <v-sheet-trigger>Open</v-sheet-trigger>
                  <v-sheet-content side="left">
                      <v-sheet-header>
                          <v-sheet-title>Sheet header</v-sheet-title>
                          <v-sheet-description>Lorem ipsum dolor sit amet.</v-sheet-description>
                      </v-sheet-header>
                      <p class="grow">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus, arcu non
                          pellentesque aliquam, nisl
                          tellus volutpat metus, quis consequat risus urna eget elit. Maecenas vehicula nisl vitae
                          vulputate pulvinar.
                          Proin tristique erat eget lacus hendrerit luctus. Donec lectus nulla, rhoncus id nisi
                          scelerisque, blandit
                          sodales tellus. Etiam ac dui ac ipsum dapibus mattis. Nunc rhoncus pretium felis, sed
                          viverra ipsum feugiat in.
                          Nam vitae leo sed dolor imperdiet euismod. Donec mollis ac magna laoreet dictum. Integer
                          dictum gravida leo in
                          ullamcorper. Quisque ac erat libero.
                      </p>
                      <v-sheet-footer>
                          footer
                          <v-sheet-close>Close</v-sheet-close>
                      </v-sheet-footer>
                  </v-sheet-content>
              </v-sheet>
          </v-card>
        <v-card class="basis-1/3">
              <div class="w-full flex gap-4">
                  <v-skeleton class="w-20 h-20"/>
                  <div class="grow flex flex-col gap-4">
                      <v-skeleton class="w-full h-8"/>
                      <div class="flex gap-4">
                          <v-skeleton class="w-full h-8"/>
                          <v-skeleton class="w-full h-8"/>
                      </div>
                  </div>
              </div>
          </v-card>
      </div>
    <div class="flex gap-6">
          <v-card class="basis-1/3">
              <v-collapsible v-model="open">
                  <v-collapsible-trigger as-child>
                      <v-button>{{ open ? 'Close collapsable' : 'Open collapsable' }}</v-button>
                  </v-collapsible-trigger>
                  <v-collapsible-content>
                      <div>Test 1</div>
                      <div>Test 2</div>
                      <div>Test 3</div>
                  </v-collapsible-content>
              </v-collapsible>
          </v-card>
        <v-card class="basis-1/3">
              <div class="flex">
                  <v-button>Before</v-button>
                  <v-spacer/>
                  <v-button>After</v-button>
              </div>
          </v-card>
        <v-card class="basis-1/3">
              <v-breadcrumb>
                  <v-breadcrumb-list>
                      <v-breadcrumb-item>
                          <v-breadcrumb-link href="/">Home</v-breadcrumb-link>
                      </v-breadcrumb-item>
                      <v-breadcrumb-separator/>
                      <v-breadcrumb-item>
                          <v-breadcrumb-page>Test</v-breadcrumb-page>
                      </v-breadcrumb-item>
                  </v-breadcrumb-list>
              </v-breadcrumb>
          </v-card>
      </div>
    <div class="flex gap-6">
          <v-card class="basis-1/3 bg-primary">
              <div class="max-w-sm">
                  <v-aspect-ratio :ratio="16 / 9">
                      <img src="/images/logo.svg" alt="logo">
                  </v-aspect-ratio>
              </div>
          </v-card>
        <v-card class="p-0">
              <v-calendar weekday-format="narrow"/>
          </v-card>
        <v-card class="grow">
              <v-carousel>
                  <v-carousel-content>
                      <v-carousel-item>
                          <div class="w-full bg-green-500 text-white text-6xl text-center py-4">1</div>
                      </v-carousel-item>
                      <v-carousel-item>
                          <div class="w-full bg-yellow-500 text-white text-6xl text-center py-4">2</div>
                      </v-carousel-item>
                      <v-carousel-item>
                          <div class="w-full bg-blue-500 text-white text-6xl text-center py-4">3</div>
                      </v-carousel-item>
                  </v-carousel-content>
                  <v-carousel-previous class="left-2"/>
                  <v-carousel-next class="right-2"/>
              </v-carousel>
          </v-card>
      </div>
  +    <v-card>

      <v-table>
          <template #title>Products</template>
          <v-table-header>
              <table-head>Name</table-head>
              <table-head>Qty</table-head>
              <table-head>Price</table-head>
          </v-table-header>
          <v-table-body>
              <v-table-row>
                  <v-table-cell>Product 1</v-table-cell>
                  <v-table-cell>7</v-table-cell>
                  <v-table-cell>R65.99</v-table-cell>
              </v-table-row>
              <v-table-row>
                  <v-table-cell>Product 2</v-table-cell>
                  <v-table-cell>1</v-table-cell>
                  <v-table-cell>R102.00</v-table-cell>
              </v-table-row>
              <v-table-row>
                  <v-table-cell>Product 3</v-table-cell>
                  <v-table-cell>3</v-table-cell>
                  <v-table-cell>R32.99</v-table-cell>
              </v-table-row>
          </v-table-body>
      </v-table>
  +    </v-card>

      <VCard>
          <VTabs default-value="account" class="w-[400px]">
              <VTabsList class="grid w-full grid-cols-2">
                  <VTabsTrigger value="account">
                      Account
                  </VTabsTrigger>
                  <VTabsTrigger value="password">
                      Password
                  </VTabsTrigger>
              </VTabsList>
              <VTabsContent value="account">
                  <VCard>
                      <VCardHeader>
                          <VCardTitle>Account</VCardTitle>
                          <VCardDescription>
                              Make changes to your account here. Click save when you're done.
                          </VCardDescription>
                      </VCardHeader>
                      <VCardContent class="space-y-2">
                          <div class="space-y-1">
                              <VLabel for="name">Name</VLabel>
                          </div>
                          <div class="space-y-1">
                              <VLabel for="username">Username</VLabel>
                          </div>
                      </VCardContent>
                      <VCardFooter>
                          <VButton>Save changes</VButton>
                      </VCardFooter>
                  </VCard>
              </VTabsContent>
              <VTabsContent value="password">
                  <VCard>
                      <VCardHeader>
                          <VCardTitle>Password</VCardTitle>
                          <VCardDescription>
                              Change your password here. After saving, you'll be logged out.
                          </VCardDescription>
                      </VCardHeader>
                      <VCardContent class="space-y-2">
                          <div class="space-y-1">
                              <VLabel for="current">Current password</VLabel>
                          </div>
                          <div class="space-y-1">
                              <VLabel for="new">New password</VLabel>
                          </div>
                      </VCardContent>
                      <VCardFooter>
                          <VButton>Save password</VButton>
                      </VCardFooter>
                  </VCard>
              </VTabsContent>
          </VTabs>
      </VCard>
  </div>
  <v-button color="destructive"></v-button>
</template>