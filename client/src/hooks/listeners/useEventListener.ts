import {useEffect} from "react";

/**
 * Event listener hook with built in cleanup
 */
export const useEventListener = (type: string, handler: (event: Event) => void) => {
    useEffect(() => {
        window.addEventListener(type, handler);

        return () => {
            window.removeEventListener(type, handler);
        };
    }, [handler, type]);
}