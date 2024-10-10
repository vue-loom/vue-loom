import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')



// import {createApp, DefineComponent, h} from 'vue'
// import './assets/index.css'
// import { createInertiaApp } from '@inertiajs/vue3';
// import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
//
// createInertiaApp({
//     resolve: async (name) => {
//         return await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue'));
//     },
//     setup({ el, App, props, plugin }): void {
//         createApp({ render: () => h(App, props) })
//             .use(plugin)
//             .mount(el);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// })
