import * as lodash from "lodash";
import { useCallback } from "react";

export const useDebounce = (effect: (arg?: any) => void, time = 500, deps: any[] = []) => {
    const lodashDebounce = lodash.debounce((event: any) => {
        effect(event)
    }, time);

    const debounce = useCallback((event: any = undefined) => lodashDebounce(event), deps)

    return {
        debounce,
    }
}
