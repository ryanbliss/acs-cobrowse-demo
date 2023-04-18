import { FC, useState } from "react";
import { FlexColumn, TextInput } from "../../components";
import { Body1, Button, Spinner } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants";
import { fetchTokenResponse } from "../../utils";

export const ACSJoinMeetingPage: FC = () => {
    const [meetingLink, setMeetingLink] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const navigate = useNavigate();

    const onJoinMeeting = async () => {
        if (!meetingLink || !displayName || loading) return;
        setLoading(true);
        try {
            const tokenResponse = await fetchTokenResponse();
            navigate(AppRoutes.acs.children.meeting.children.home + window.location.hash ?? "", {
                state: {
                    callLocator: {
                        meetingLink,
                    },
                    displayName,
                    user: tokenResponse.user,
                    token: tokenResponse.token,
                },
            });
        } catch (error: any) {
            console.error(error);
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error("Error fetching user token"));
            }
            setLoading(false);
        }
    };

    return (
        <FlexColumn fill="both" gap="small">
            <TextInput
                id="meeting-join"
                label="Meeting join URL"
                placeholder="Enter meeting join URL..."
                value={meetingLink}
                setValue={setMeetingLink}
            />
            <TextInput
                id="display-name"
                label="Display name"
                placeholder="Enter display name..."
                value={displayName}
                setValue={setDisplayName}
            />
            { loading && (
                <Spinner />
            )}
            { !loading && (
                <Button disabled={!meetingLink || !displayName} onClick={onJoinMeeting}>
                    {"Join meeting"}
                </Button>
            )}
            { !!error && (
                <Body1>
                    {error.message}
                </Body1>
            )}
        </FlexColumn>
    );
};
