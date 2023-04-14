import { FC } from "react";
import { Button } from "@fluentui/react-components";
import { FlexColumn } from "../components";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../constants";

// This page is used for tester/user to choose whether to use Teams or ACS flow
export const HomePage: FC = () => {
    const navigate = useNavigate();
    return (
        <FlexColumn gap="medium">
            <Button
                onClick={() => {
                    navigate(AppRoutes.acs.children.meetingJoin);
                }}
            >
                {"Use Azure Communication Services"}
            </Button>
            <Button
                onClick={() => {
                    navigate(AppRoutes.teams.children.sidePanel);
                }}
            >
                {"Use Teams side panel"}
            </Button>
            <Button
                onClick={() => {
                    navigate(AppRoutes.teams.children.meeting.children.home);
                }}
            >
                {"Use Teams meeting stage"}
            </Button>
        </FlexColumn>
    );
};
