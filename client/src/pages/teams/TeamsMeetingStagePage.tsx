import { FC } from "react";
import { AppRoutes, IN_TEAMS } from "../../constants";
import { TestLiveShareHost, ILiveShareHost } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { LiveShareWrapper } from "../../components";
import { LiveBrowser } from "../../components/live-browser";

const host: ILiveShareHost = IN_TEAMS
    ? LiveShareHost.create()
    : TestLiveShareHost.create();
export const TeamsMeetingStagePage: FC = () => {
    return (
        <LiveShareWrapper host={host}>
            <LiveBrowser displayName={"Placeholder"} routePrefix={AppRoutes.teams.children.meeting.base} />
        </LiveShareWrapper>
    );
};
