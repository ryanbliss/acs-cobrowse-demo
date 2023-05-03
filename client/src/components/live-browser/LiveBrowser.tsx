import { FC, useEffect, useRef } from "react";
import { FlexColumn } from "../common";
import { Spinner, tokens } from "@fluentui/react-components";
import {
    useFluidObjectsContext,
    useLivePresence,
} from "@microsoft/live-share-react";
import { PresenceState } from "@microsoft/live-share";
import { Outlet } from "react-router-dom";
import {
    LiveCanvasOverlay,
    LiveNavigationBar,
    useLiveNavigate,
} from "./internals";
import debounce from "lodash.debounce";
import { AppContextProvider } from "../../context";
import { useCommonScreenSize } from "../../hooks";
import { IUserData } from "../../interfaces";
import { LiveRoutePrefix } from "../../constants";

interface ILiveBrowserProps {
    displayName: string;
    routePrefix: LiveRoutePrefix;
}

export const LiveBrowser: FC<ILiveBrowserProps> = ({
    displayName,
    routePrefix,
}) => {
    const browserContainerRef = useRef<HTMLDivElement | null>(null);
    const { container } = useFluidObjectsContext();
    const navigate = useLiveNavigate(routePrefix);

    const { allUsers, localUser, updatePresence } = useLivePresence<IUserData>(
        undefined,
        {
            // TODO: remove custom display name once new presence changes are in
            displayName,
            screenWidth: window.document.body.clientWidth,
            screenHeight: window.document.body.clientHeight,
        }
    );
    const { width, height } = useCommonScreenSize(allUsers);

    useEffect(() => {
        const onResize = debounce((_: Event) => {
            updatePresence(PresenceState.online, {
                displayName,
                screenWidth: window.document.body.clientWidth,
                screenHeight: window.document.body.clientHeight,
            });
        }, 50);
        window.addEventListener("resize", onResize, true);
        return () => {
            window.removeEventListener("resize", onResize, true);
        };
    }, [displayName, updatePresence]);

    if (!container) {
        return (
            <FlexColumn fill="both" vAlign="center" hAlign="center">
                <Spinner />
            </FlexColumn>
        );
    }
    return (
        <AppContextProvider
            navigate={navigate}
            width={width}
            height={height}
            allUsers={allUsers}
            localUser={localUser}
            routePrefix={routePrefix}
        >
            <FlexColumn
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: tokens.colorNeutralBackground1,
                }}
                ref={browserContainerRef}
            >
                <LiveCanvasOverlay
                    hostRef={browserContainerRef}
                />
                <LiveNavigationBar routePrefix={routePrefix} />
                <Outlet />
            </FlexColumn>
        </AppContextProvider>
    );
};
