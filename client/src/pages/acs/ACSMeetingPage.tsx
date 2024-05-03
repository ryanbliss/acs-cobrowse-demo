import { FC, useCallback, useRef, useMemo, memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexColumn } from "../../components";
import { LiveBrowser } from "../../components/live-browser";
import { AppRoutes } from "../../constants";
import { createAutoRefreshingCredential } from "../../utils";
import {
    CallAdapter,
    CallAdapterState,
    toFlatCommunicationIdentifier,
} from "@azure/communication-react";
import { Spinner } from "@fluentui/react-components";
import { ACSCall } from "../../components/acs-call/ACSCall";
import { CallState } from "@azure/communication-calling";
import {
    IUseACSCallResults,
    useACSCall,
    useACSTeamsLiveShareHost,
    useLiveOffer,
} from "../../hooks";
import { LiveShareProvider, useLiveState } from "@microsoft/live-share-react";
import { IOffer } from "../../interfaces";
import { OFFERS } from "../../constants/Offers";
import { UserMeetingRole } from "@microsoft/live-share";

export const ACSMeetingPage: FC = memo(() => {
    const { state } = useLocation();
    const [callState, setCallState] = useState<CallState>("None");
    const initialStateRef = useRef(state);
    const callIdRef = useRef<string>();

    // We do this here because the route may change later, and we don't want this state to be lost
    const user =
        typeof initialStateRef.current?.user === "object"
            ? initialStateRef.current.user
            : undefined;
    const token: string | undefined =
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

    // Auto refreshing credential used by ACS
    const credential = useMemo(() => {
        if (!user?.communicationUserId || !token) return undefined;
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
                if (
                    state?.call?.state &&
                    state.call.state !== currentCallState
                ) {
                    currentCallState = state.call.state;
                    setCallState(currentCallState);
                }
            });
            return adapter;
        },
        [navigate]
    );

    // Creates a CallAdapter and CallAgent for a given meeting join URL
    const acsResults = useACSCall(
        {
            userId: user,
            displayName,
            credential,
            locator:
                typeof initialStateRef.current?.callLocator === "object"
                    ? initialStateRef.current.callLocator
                    : undefined,
        },
        afterCreate
    );

    // Stateful hook for the ILiveShareHost, which is set after connecting to a call
    const host = useACSTeamsLiveShareHost(
        acsResults,
        callState,
        callIdRef,
        meetingJoinUrl,
        token,
        displayName
    );

    if (
        !acsResults?.adapter ||
        !initialStateRef.current?.user?.communicationUserId
    ) {
        return (
            <FlexColumn fill="both" vAlign="center" hAlign="center">
                <Spinner />
            </FlexColumn>
        );
    }
    if (callState !== "Connected") {
        return (
            <FlexColumn fill="both">
                <ACSCall adapter={acsResults.adapter} />
            </FlexColumn>
        );
    }
    if (!host) {
        return (
            <FlexColumn fill="both" vAlign="center" hAlign="center">
                <Spinner />
            </FlexColumn>
        );
    }
    return (
        <LiveShareProvider host={host} joinOnLoad>
            <ACSMeetingCallRenderer acsResults={acsResults} />
        </LiveShareProvider>
    );
});

interface IACSMeetingCallRendererProps {
    acsResults: IUseACSCallResults;
}

const ACSMeetingCallRenderer: FC<IACSMeetingCallRendererProps> = ({
    acsResults,
}) => {
    const [offer] = useLiveOffer();

    if (!offer) {
        return (
            <FlexColumn fill="both">
                <ACSCall adapter={acsResults.adapter} />
            </FlexColumn>
        );
    }

    return (
        <>
            <LiveBrowser
                routePrefix={AppRoutes.acs.children.meeting.base}
                offer={offer}
            />
            <FlexColumn
                style={{
                    width: "272px",
                    height: "300px",
                    position: "fixed",
                    right: "8px",
                    bottom: "8px",
                    zIndex: 3,
                }}
            >
                <ACSCall adapter={acsResults.adapter} formFactor="mobile" />
            </FlexColumn>
        </>
    );
};

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
