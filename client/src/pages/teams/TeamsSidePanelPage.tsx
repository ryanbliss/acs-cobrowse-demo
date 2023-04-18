import { FC } from "react";
import { FlexColumn } from "../../components";
import { Button, Title2 } from "@fluentui/react-components";
import { meeting } from "@microsoft/teams-js";
import { AppRoutes, IN_TEAMS } from "../../constants";

export const TeamsSidePanelPage: FC = () => {
    return (
        <FlexColumn gap="medium">
            <Title2>{"Press 'Share to meeting' to begin."}</Title2>
            <Button
                onClick={() => {
                    const urlToShare = `${window.location.origin}${AppRoutes.teams.children.meeting}?inTeams=${IN_TEAMS}`;
                    if (IN_TEAMS) {
                        meeting.shareAppContentToStage((error, result) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            if (!result) {
                                console.error(
                                    new Error(
                                        "Sharing failed from shareAppContentToStage"
                                    )
                                );
                                return;
                            }
                            console.log("shareAppContentToStage success");
                        }, urlToShare);
                    } else {
                        // We are testing the app locally in a browser, simulate share to stage by opening in a new browser tab
                        window.open(urlToShare, "_blank");
                    }
                }}
            >
                {"Share to meeting"}
            </Button>
        </FlexColumn>
    );
};
