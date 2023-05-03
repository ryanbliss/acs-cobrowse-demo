import { FC, ReactNode, CSSProperties, useRef, useEffect } from "react";
import { FlexColumn, FlexItem, FlexRow } from "../../common/flex";
import debounce from "lodash.debounce";
import { useLiveState } from "@microsoft/live-share-react";
import { LiveEvent } from "@microsoft/live-share";
import { useAppContext } from "../../../context";
import { useStateToRef } from "../../../hooks";

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
    userId?: string;
    timestamp: number;
}

export const LiveScrollView: FC<ILiveScrollViewProps> = ({
    uniqueKey,
    direction = "vertical",
    fill,
    children,
    style,
}) => {
    const scrollViewRef = useRef<HTMLDivElement>(null);
    // Tracks the remote scroll position, when the change occurred, and which user last made the change
    const [remoteScrollData, setRemoteScrollData] = useLiveState<IScrollData>(
        uniqueKey,
        { scrollTop: 0, scrollLeft: 0, timestamp: LiveEvent.getTimestamp() }
    );
    // Wraps the remote scroll data into React.useRef, so it can easily be accessed in JS event listeners
    const remoteScrollDataRef = useStateToRef(remoteScrollData);

    const { localUser } = useAppContext();

    // Registers an event listener to scroll position changes and sets remoteScrollData if updated.
    // There is some logic in place that will prevent local scrolling if a remote user has scrolled recently, which helps reduce conflicts.
    useEffect(() => {
        // Send the updated scroll position with a debounce to minimize events sent
        const sendScrollEvent = debounce((event: Event) => {
            const timestamp = LiveEvent.getTimestamp();
            const scrollTop = (event.target as any)?.scrollTop;
            const scrollLeft = (event.target as any)?.scrollLeft;
            if (typeof scrollTop !== "number" || typeof scrollLeft !== "number")
                return;
            setRemoteScrollData({ scrollTop, scrollLeft, timestamp, userId: localUser?.userId });
        }, 25);
        const onScrollEvent = (event: Event) => {
            const timestamp = LiveEvent.getTimestamp();
            // If the local user is trying to scroll on this view while another user has recently scrolled, we scroll back to the remote scroll position.
            if (remoteScrollDataRef.current?.userId !== localUser?.userId && timestamp - remoteScrollDataRef.current.timestamp <= 500) {
                const remoteScrollTop = remoteScrollDataRef.current?.scrollTop ?? 0;
                const remoteScrollLeft = remoteScrollDataRef.current.scrollLeft ?? 0;
                scrollViewRef.current?.scrollTo(remoteScrollLeft, remoteScrollTop);
                return;
            }
            sendScrollEvent(event);
        };
        scrollViewRef.current?.addEventListener("scroll", onScrollEvent);
        // Unmount cleanup of event listeners & debounce function
        return () => {
            scrollViewRef.current?.removeEventListener("scroll", onScrollEvent);
            sendScrollEvent.cancel();
        };
    }, [localUser?.userId, remoteScrollData?.userId, remoteScrollData?.timestamp, setRemoteScrollData]);

    // When the remote scroll position has changed and it is different than the local scroll position, we scroll to that position.
    useEffect(() => {
        const scrollTop = scrollViewRef.current?.scrollTop;
        const scrollLeft = scrollViewRef.current?.scrollLeft;
        const remoteScrollTop = remoteScrollData?.scrollTop;
        const remoteScrollLeft = remoteScrollData?.scrollLeft;
        if (
            typeof scrollTop !== "number" ||
            typeof scrollLeft !== "number" ||
            typeof remoteScrollTop !== "number" ||
            typeof remoteScrollLeft !== "number"
        )
            return;

        scrollViewRef.current?.scrollTo(remoteScrollLeft, remoteScrollTop);
    }, [remoteScrollData?.scrollTop, remoteScrollData?.scrollLeft]);

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
