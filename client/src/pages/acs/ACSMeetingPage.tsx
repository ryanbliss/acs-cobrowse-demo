import {
    FC,
    useCallback,
    useRef,
    useMemo,
    useEffect,
    memo,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { CallState } from "@azure/communication-calling";

const USE_ACS_HOST = false;

export const ACSMeetingPage: FC = memo(() => {
    const { state } = useLocation();
    const [host, setHost] = useState<ILiveShareHost>();
    const [callState, setCallState] = useState<CallState>("None");
    const initialStateRef = useRef(state);
    const callIdRef = useRef<string>();
    
    const user =
        typeof initialStateRef.current?.user === "object"
            ? initialStateRef.current.user
            : undefined;
    const token =
        typeof initialStateRef.current?.token === "string"
            ? initialStateRef.current.token
            : undefined;
    const displayName =
        typeof initialStateRef.current?.displayName === "string"
            ? initialStateRef.current.displayName
            : undefined;
    const meetingJoinUrl =
        typeof initialStateRef.current?.callLocator?.meetingLink === "string"
            ? initialStateRef.current.callLocator.meetingLink
            : "";
    const credential = useMemo(() => {
        if (!user?.communicationUserId) return undefined;
        return createAutoRefreshingCredential(
            toFlatCommunicationIdentifier(user),
            token
        );
    }, [token, user?.communicationUserId]);

    const navigate = useNavigate();
    const afterCreate = useCallback(
        async (adapter: CallAdapter): Promise<CallAdapter> => {
            let currentCallState: CallState = "None";
            adapter.on("callEnded", () => {
                // On call ended
                navigate(AppRoutes.home);
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
                if (state?.call?.state && state.call.state !== currentCallState) {
                    currentCallState = state.call.state;
                    setCallState(currentCallState);
                }
            });
            return adapter;
        },
        [callIdRef, navigate]
    );
    const adapter = useAzureCommunicationCallAdapter(
        {
            userId: user,
            displayName,
            credential: credential,
            locator:
                typeof initialStateRef.current?.callLocator === "object"
                    ? initialStateRef.current.callLocator
                    : undefined,
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

    // Set the host with the adapter, meetingJoinUrl, and token
    useEffect(() => {
        if (!adapter || !meetingJoinUrl || !token) return;
        const userId = adapter.getState().userId;
        // Only communicationUser types are supported
        if (userId.kind !== "communicationUser") return;
        setHost(
            USE_ACS_HOST
                ? AcsLiveShareHost.create({
                      acsUserId: userId.communicationUserId,
                      teamsMeetingJoinUrl: meetingJoinUrl,
                      acsTokenProvider: () => token,
                  })
                : TestLiveShareHost.create()
        );
    }, [adapter, meetingJoinUrl, token]);

    if (!adapter || !initialStateRef.current?.user?.communicationUserId || !host) {
        return (
            <FlexColumn fill="both" vAlign="center" hAlign="center">
                <Spinner />
            </FlexColumn>
        );
    }
    if (callState !== 'Connected') {
        return (
            <FlexColumn fill="both">
                <ACSCall adapter={adapter} />
            </FlexColumn>
        );
    }
    adapter.getState()
    return (
        <LiveShareWrapper host={host}>
            <LiveBrowser displayName={displayName} routePrefix={AppRoutes.acs.children.meeting.base} />
            <FlexColumn
                style={{
                    width: "280px",
                    height: "256px",
                    position: "fixed",
                    right: "8px",
                    bottom: "8px",
                    zIndex: 3,
                }}
            >
                <ACSCall adapter={adapter} formFactor="mobile" />
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
