import { useEffect, useRef } from "react"

export const useStateToRef = <T = any>(val: T) => {
    const ref = useRef(val);
    useEffect(() => {
        ref.current = val;
    }, [val]);

    return ref;
}
