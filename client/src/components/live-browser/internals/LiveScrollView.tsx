import { FC, ReactNode, CSSProperties, useRef, useEffect } from "react";
import { FlexColumn, FlexItem, FlexRow } from "../../common";
import debounce from "lodash.debounce";
import { LiveEvent } from "@microsoft/live-share";
import { useLiveState } from "@microsoft/live-share-react";
import { useStateToRef } from "../../../hooks";
import { useAppContext } from "../../../context";

interface ILiveScrollViewProps {
    uniqueKey: string;
    direction?: "vertical" | "horizontal";
    fill?: "both" | "height" | "width" | "view" | "view-height";
    children: ReactNode;
    style?: CSSProperties;
}

interface IScrollData {
    scrollTop: number;
    scrollLeft: number;
    timestamp: number;
    userId?: string;
}

export const LiveScrollView: FC<ILiveScrollViewProps> = ({
    uniqueKey,
    direction = "vertical",
    fill,
    children,
    style,
}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useLiveState<IScrollData>(
        uniqueKey,
        { scrollTop: 0, scrollLeft: 0, timestamp: LiveEvent.getTimestamp() }
    );
    const stateRef = useStateToRef(state);

    const { localUser } = useAppContext();

    useEffect(() => {
        const sendScrollEvent = debounce((event: Event) => {
            const timestamp = LiveEvent.getTimestamp();
            const scrollTop = (event.target as any)?.scrollTop;
            const scrollLeft = (event.target as any)?.scrollLeft;
            if (typeof scrollTop !== "number" || typeof scrollLeft !== "number")
                return;
            setState({ scrollTop, scrollLeft, timestamp, userId: localUser?.userId });
        }, 25);
        const onScrollEvent = (event: Event) => {
            const timestamp = LiveEvent.getTimestamp();
            if (stateRef.current?.userId !== localUser?.userId && timestamp - stateRef.current.timestamp <= 500) {
                const remoteScrollTop = stateRef.current?.scrollTop ?? 0;
                const remoteScrollLeft = stateRef.current.scrollLeft ?? 0;
                scrollViewRef.current?.scrollTo(remoteScrollLeft, remoteScrollTop);
                return;
            }
            sendScrollEvent(event);
        };
        scrollViewRef.current?.addEventListener("scroll", onScrollEvent);
        return () => {
            scrollViewRef.current?.removeEventListener("scroll", onScrollEvent);
            sendScrollEvent.cancel();
        };
    }, [localUser?.userId, state?.userId, state?.timestamp, setState]);

    useEffect(() => {
        const scrollTop = scrollViewRef.current?.scrollTop;
        const scrollLeft = scrollViewRef.current?.scrollLeft;
        const remoteScrollTop = state?.scrollTop;
        const remoteScrollLeft = state?.scrollLeft;
        if (
            typeof scrollTop !== "number" ||
            typeof scrollLeft !== "number" ||
            typeof remoteScrollTop !== "number" ||
            typeof remoteScrollLeft !== "number"
        )
            return;

        scrollViewRef.current?.scrollTo(remoteScrollLeft, remoteScrollTop);
    }, [state?.scrollTop, state?.scrollLeft]);

    if (direction === "horizontal") {
        return (
            <FlexRow
                fill={fill}
                ref={scrollViewRef}
                scroll
                style={style}
                name="LiveScrollView"
            >
                <FlexItem noShrink>
                    <FlexRow name="InnerLiveScrollView" fill="height">{children}</FlexRow>
                </FlexItem>
            </FlexRow>
        );
    }

    return (
        <FlexColumn
            fill={fill}
            ref={scrollViewRef}
            scroll
            style={style}
            name="LiveScrollView"
        >
            <FlexItem noShrink>
                <FlexColumn name="InnerLiveScrollView">{children}</FlexColumn>
            </FlexItem>
        </FlexColumn>
    );
};
