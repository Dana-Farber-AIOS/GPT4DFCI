import { DependencyList, useEffect, useRef } from "react";

const useAutoScrollToBottom = (dependencies: DependencyList) => {
    const ref = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollToBottom();
    }, dependencies);

    return ref;
};

export default useAutoScrollToBottom;
