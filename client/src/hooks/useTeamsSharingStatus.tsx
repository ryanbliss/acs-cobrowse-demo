import * as microsoftTeams from "@microsoft/teams-js";
import { useEffect, useState, useRef } from "react";
import { IN_TEAMS } from "../constants";

export const useTeamsSharingStatus = (): boolean => {
    const [sharingActive, setSharingActive] = useState(false);
    const intervalIdRef = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (!IN_TEAMS) return;
        if (!intervalIdRef.current) {
            const setAppSharingStatus = () => {
                microsoftTeams.meeting.getAppContentStageSharingCapabilities(
                    (capabilitiesError, result) => {
                        if (
                            !capabilitiesError &&
                            result?.doesAppHaveSharePermission
                        ) {
                            microsoftTeams.meeting.getAppContentStageSharingState(
                                (_, state) => {
                                    if (state) {
                                        setSharingActive(
                                            state.isAppSharing
                                        );
                                    } else {
                                        setSharingActive(false);
                                    }
                                }
                            );
                        } else {
                            setSharingActive(false);
                        }
                    }
                );
            };
            setAppSharingStatus();
            intervalIdRef.current = setInterval(() => {
                setAppSharingStatus();
            }, 2000);
        }
        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, []);

    return sharingActive;
};
