import {PaginationDriver} from "./pagination";
import {inject} from "vue";
import {Router} from "@inertiajs/core";

const InertiaDriver: PaginationDriver = {
    navigate: (url: string) => {
        const router: Router | null = inject<Router | null>('inertia-router', null);
        router?.visit(url, {
            preserveScroll: true,
        });
    }
};

export default InertiaDriver;