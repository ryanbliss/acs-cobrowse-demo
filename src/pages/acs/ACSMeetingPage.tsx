import { FC, useCallback, useRef, useMemo, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { ILiveShareHost, TestLiveShareHost } from "@microsoft/live-share";
import { FlexColumn, LiveShareWrapper } from "../../components";
import { LiveBrowser } from "../../components/live-browser";
import { AppRoutes } from "../../constants";
import { AcsLiveShareHost, createAutoRefreshingCredential } from "../../utils";
import {
    CallAdapter,
    CallAdapterState,
    toFlatCommunicationIdentifier,
    useAzureCommunicationCallAdapter,
} from "@azure/communication-react";
import { Spinner } from "@fluentui/react-components";
import { ACSCall } from "../../components/acs-call/ACSCall";

const USE_ACS_HOST = true;

export const ACSMeetingPage: FC = memo(() => {
    const { state } = useLocation();
    const callIdRef = useRef<string>();

    const afterCreate = useCallback(
        async (adapter: CallAdapter): Promise<CallAdapter> => {
            adapter.on("callEnded", () => {
                // On call ended
            });
            adapter.on("error", (e) => {
                // Error is already acted upon by the Call composite, but the surrounding application could
                // add top-level error handling logic here (e.g. reporting telemetry).
                console.log("Adapter error event:", e);
            });
            adapter.onStateChange((state: CallAdapterState) => {
                const pageTitle = convertPageStateToString(state);
                document.title = `${pageTitle} - Live Share ACS`;

                if (state?.call?.id && callIdRef.current !== state?.call?.id) {
                    callIdRef.current = state?.call?.id;
                    console.log(`Call Id: ${callIdRef.current}`);
                }
            });
            return adapter;
        },
        [callIdRef]
    );
    const userId = typeof state?.userId === "string" ? state.userId : "";
    const token = typeof state?.token === "string" ? state.token : "";
    const credential = useMemo(
        () =>
            createAutoRefreshingCredential(
                toFlatCommunicationIdentifier(userId),
                token
            ),
        [token, userId]
    );

    const adapter = useAzureCommunicationCallAdapter(
        {
            userId,
            displayName:
                typeof state?.displayName === "string"
                    ? state.displayName
                    : undefined,
            credential: credential,
            locator:
                typeof state?.callLocator === "object" ? state.callLocator : undefined,
        },
        afterCreate
    );

    // Dispose of the adapter in the window's before unload event.
    // This ensures the service knows the user intentionally left the call if the user
    // closed the browser tab during an active call.
    useEffect(() => {
        const disposeAdapter = (): void => adapter?.dispose();
        window.addEventListener("beforeunload", disposeAdapter);
        return () => window.removeEventListener("beforeunload", disposeAdapter);
    }, [adapter]);

    if (!adapter) return <Spinner />;

    const meetingJoinUrl =
        typeof state?.callLocator?.meetingLink === "string"
            ? state.callLocator.meetingLink
            : "";
    const host: ILiveShareHost = USE_ACS_HOST
        ? AcsLiveShareHost.create({
              callAdapter: adapter,
              teamsMeetingJoinUrl: meetingJoinUrl,
              acsTokenProvider: () => token,
          })
        : TestLiveShareHost.create();
    return (
        <LiveShareWrapper host={host}>
            <LiveBrowser routePrefix={AppRoutes.acs.children.meeting.base} />
            <FlexColumn
                style={{
                    width: "320px",
                    height: "120px",
                    position: "fixed",
                    left: "8px",
                    bottom: "8px",
                    zIndex: 3,
                }}
            >
                <ACSCall adapter={adapter} />
            </FlexColumn>
        </LiveShareWrapper>
    );
});

const convertPageStateToString = (state: CallAdapterState): string => {
    switch (state.page) {
        case "accessDeniedTeamsMeeting":
            return "error";
        case "leftCall":
            return "end call";
        case "removedFromCall":
            return "end call";
        default:
            return `${state.page}`;
    }
};
