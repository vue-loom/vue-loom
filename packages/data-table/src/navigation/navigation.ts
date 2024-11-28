import {PaginationDriver} from "./drivers/pagination";
import InertiaDriver from "./drivers/inertia";
import DefaultDriver from "./drivers/default";

let customDriver: PaginationDriver | undefined;

const registerCustomDriver = (driver: PaginationDriver) => {
    customDriver = driver;
}

// Retrieve the correct pagination driver
const navigate = (url: string): void => {
    if (customDriver) {
        customDriver.navigate(url);
    }

    // If Inertia.js is available in the window object, use InertiaDriver
    else if ((window as any).Inertia) {
        InertiaDriver.navigate(url);
    }

    // Fallback to the default driver if no custom driver or Inertia
    else {
        DefaultDriver.navigate(url);
    }
}

export {
    registerCustomDriver,
    navigate
};