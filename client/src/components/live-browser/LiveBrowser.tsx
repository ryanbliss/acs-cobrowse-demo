import { FC, useEffect, useRef } from "react";
import { FlexColumn } from "../flex";
import { Spinner, tokens } from "@fluentui/react-components";
import {
    useFluidObjectsContext,
    useLivePresence,
} from "@microsoft/live-share-react";
import { PresenceState } from "@microsoft/live-share";
import { Outlet } from "react-router-dom";
import { useLiveNavigate } from "./useLiveNavigate";
import { NavigationBar } from "../navigation";
import { LiveCanvasOverlay } from "./internals";
import debounce from "lodash.debounce";

interface ILiveBrowserProps {
    displayName: string;
    routePrefix: string;
}

export const LiveBrowser: FC<ILiveBrowserProps> = ({ displayName, routePrefix }) => {
    const browserContainerRef = useRef<HTMLDivElement | null>(null);
    const { container } = useFluidObjectsContext();
    const navigate = useLiveNavigate();
    const { allUsers, updatePresence } = useLivePresence<{
        width: number;
        height: number;
    }>(undefined, {
        width: window.document.body.clientWidth,
        height: window.document.body.clientHeight,
    });

    const onlineUsers = allUsers.filter((user) => user.state === PresenceState.online);
    const sortedWidthUsers = [...onlineUsers].sort(
        (a, b) => (a.data?.width || 0) - (b.data?.width || 0)
    );
    const width =
        sortedWidthUsers.length > 0 ? sortedWidthUsers[0].data?.width : 0;
    const sortedHeightUsers = [...onlineUsers].sort(
        (a, b) => (a.data?.height || 0) - (b.data?.height || 0)
    );
    const height =
        sortedHeightUsers.length > 0 ? sortedHeightUsers[0].data?.height : 0;

    useEffect(() => {
        const onResize = debounce((_: Event) => {
            updatePresence(PresenceState.online, {
                width: window.document.body.clientWidth,
                height: window.document.body.clientHeight,
            });
        }, 50);
        window.addEventListener("resize", onResize, true);
        return () => {
            window.removeEventListener("resize", onResize, true);
        };
    }, [updatePresence]);

    if (!container) {
        return (
            <FlexColumn fill="both" vAlign="center" hAlign="center">
                <Spinner />
            </FlexColumn>
        );
    }
    return (
        <FlexColumn
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: tokens.colorNeutralBackground1,
            }}
            ref={browserContainerRef}
        >
            <LiveCanvasOverlay
                displayName={displayName}
                width={width ?? 0}
                height={height ?? 0}
                hostRef={browserContainerRef}
            />
            <NavigationBar routePrefix={routePrefix} navigate={navigate} />
            <Outlet />
        </FlexColumn>
    );
};
