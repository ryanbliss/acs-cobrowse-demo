import { meeting } from "@microsoft/teams-js";
import { useEffect, useRef, useState } from "react";
import { IN_TEAMS } from "../constants";
export const useMeetingDetails = (): meeting.IMeetingDetailsResponse | undefined => {
    const [meetingDetails, setMeetingDetails] = useState<meeting.IMeetingDetailsResponse>();
    const startedRef = useRef(false);

    useEffect(() => {
        if (!IN_TEAMS) return;
        if (startedRef.current) return;
        startedRef.current = true;
        console.log("useMeetingDetails: getting meeting details");
        meeting.getMeetingDetails((error, meetingDetails) => {
            if (error) {
                console.error(error);
                return;
            }
            if (!meetingDetails) {
                console.error("useMeetingDetails: undefined or null meetingDetails");
                return;
            }
            setMeetingDetails(meetingDetails);
        });
    }, []);

    return meetingDetails;
}