import { CallAgent, CallState } from "@azure/communication-calling";
import { CallAdapter } from "@azure/communication-react";
import { TestLiveShareHost, ILiveShareHost } from "@microsoft/live-share";
import { MutableRefObject, useEffect, useState } from "react";
import { ACSLiveShareHost } from "../utils";

const USE_ACS_HOST = false;

export const useACSLiveShareHost = (
    acsResults: { adapter: CallAdapter; callAgent: CallAgent } | undefined,
    callState: CallState,
    callIdRef: MutableRefObject<string | undefined>,
    meetingJoinUrl: string | undefined,
    token: string | undefined,
    displayName: string | undefined
) => {
    const [host, setHost] = useState<ILiveShareHost>();

    // Set the host with the adapter, meetingJoinUrl, and token
    useEffect(() => {
        if (!acsResults || !meetingJoinUrl || !token) return;
        const userId = acsResults?.adapter.getState().userId;
        // Only communicationUser types are supported
        if (userId.kind !== "communicationUser") return;
        // Must connected to a call to set host
        if (callState !== "Connected" || !callIdRef.current) return;
        const call = acsResults.callAgent.calls.find(
            (checkCall) => checkCall.id === callIdRef.current
        );
        if (!call) {
            console.error(
                `ACSMeetingPage: Could not find valid Call for call ID = ${callIdRef.current} in callAgent, despite being in Connected state`
            );
            return;
        }
        console.log("ACSMeetingPage: setting host with callId", call.id);
        setHost(
            USE_ACS_HOST
                ? ACSLiveShareHost.create({
                      userId: userId.communicationUserId,
                      displayName,
                      call,
                      teamsMeetingJoinUrl: meetingJoinUrl,
                      acsTokenProvider: () => Promise.resolve(token),
                  })
                : TestLiveShareHost.create()
        );
    }, [acsResults, meetingJoinUrl, token, displayName, callState]);

    return host;
};
