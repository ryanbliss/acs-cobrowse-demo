import { FC, useEffect } from "react";
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
    routePrefix: string;
}

export const LiveBrowser: FC<ILiveBrowserProps> = ({ routePrefix }) => {
    const { container } = useFluidObjectsContext();
    const navigate = useLiveNavigate();
    const { allUsers, updatePresence } = useLivePresence<{ width: number }>(
        undefined,
        {
            width: window.document.body.clientWidth,
        }
    );

    const sortedUsers = allUsers.sort(
        (a, b) => (a.data?.width || 0) - (b.data?.width || 0)
    );
    const width = sortedUsers.length > 0 ? sortedUsers[0].data?.width : 0;

    useEffect(() => {
        const onResize = debounce((_: Event) => {
            updatePresence(PresenceState.online, {
                width: window.document.body.clientWidth,
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
            fill="view-height"
            style={{
                width: `${width}px`,
                backgroundColor: tokens.colorNeutralBackground1,
            }}
        >
            <LiveCanvasOverlay width={width ?? 0} />
            <NavigationBar routePrefix={routePrefix} navigate={navigate} />
            <Outlet />
        </FlexColumn>
    );
};
