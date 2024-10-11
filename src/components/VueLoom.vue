<script setup lang="ts">
import {VButton, VCard, VCardContent, VSonner, useToast, VToaster} from "@vue-loom/vue-loom";
// import Sonner from '../../packages/vue-loom/src/components/ui/sonner/Sonner.vue'
// import {toast} from 'vue-sonner';

const {toast} = useToast();

const click = () => {
  console.log('Clicked!');
    toast({title: 'Here it is...'});
}
</script>

<template>
<!--    <Sonner rich-colors position="top-right" close-button/>-->
    <VToaster/>
  <VButton @click="click">Click me</VButton>

  <VCard>
    <VCardContent></VCardContent>
  </VCard>
</template>

<style scoped>

</style>