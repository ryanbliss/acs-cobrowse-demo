import { FC, ReactNode, CSSProperties, useRef, useEffect } from "react";
import { FlexColumn, FlexItem } from "../../flex";
import debounce from "lodash.debounce";
import { useLiveState } from "@microsoft/live-share-react";

interface ILiveScrollViewProps {
    uniqueKey: string;
    fill?: "both" | "height" | "width" | "view" | "view-height";
    children: ReactNode;
    style?: CSSProperties;
}

interface IScrollData {
    scrollTop: number;
}

export const LiveScrollView: FC<ILiveScrollViewProps> = ({
    uniqueKey,
    fill,
    children,
    style,
}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [state, data, setState] = useLiveState<string, IScrollData>(
        uniqueKey,
        "scroll",
        { scrollTop: 0 }
    );

    useEffect(() => {
        const onScrollEvent = debounce((event: Event) => {
            const scrollTop = (event.target as any)?.scrollTop;
            if (typeof scrollTop !== "number") return;
            console.log(scrollTop);
            setState("scroll", { scrollTop: scrollTop });
        }, 50);
        scrollViewRef.current?.addEventListener("scroll", onScrollEvent);
        return () => {
            scrollViewRef.current?.removeEventListener("scroll", onScrollEvent);
        };
    }, [setState]);

    useEffect(() => {
        const scrollTop = scrollViewRef.current?.scrollTop;
        const remoteScrollTop = data?.scrollTop;
        if (typeof scrollTop !== "number" || typeof remoteScrollTop !== "number") return;
        if (scrollTop === remoteScrollTop) return;
        scrollViewRef.current?.scrollTo(0, remoteScrollTop);
    }, [data?.scrollTop]);

    return (
        <FlexColumn fill={fill} ref={scrollViewRef} scroll style={style}>
            <FlexItem noShrink>
                <FlexColumn>{children}</FlexColumn>
            </FlexItem>
        </FlexColumn>
    );
};
