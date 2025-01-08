import {PaginationDriver} from "./pagination";

const DefaultDriver: PaginationDriver = {
    navigate: (url: string) => {
        window.location.href = url;
    }
};

export default DefaultDriver;