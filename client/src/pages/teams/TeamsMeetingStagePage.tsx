import { FC, useState } from "react";
import { AppRoutes, IN_TEAMS } from "../../constants";
import { TestLiveShareHost, ILiveShareHost } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { LiveBrowser } from "../../components/live-browser";
import { LiveShareProvider } from "@microsoft/live-share-react";
import { useLiveOffer } from "../../hooks";
import { FlexColumn } from "../../components";
import { LiveOfferPicker } from "../../components/live-browser/LiveOfferPicker";

export const TeamsMeetingStagePage: FC = () => {
    const [host] = useState<ILiveShareHost>(
        IN_TEAMS ? LiveShareHost.create() : TestLiveShareHost.create()
    );
    return (
        <LiveShareProvider host={host} joinOnLoad>
            <TeamsMeetingStageRenderer />
        </LiveShareProvider>
    );
};

const TeamsMeetingStageRenderer: FC = () => {
    const [offer, setOffer] = useLiveOffer();

    if (!offer) {
        return (
            <FlexColumn fill="both">
                <LiveOfferPicker
                    buttonText="Select"
                    selectedOffer={offer}
                    onSelectOffer={setOffer}
                />
            </FlexColumn>
        );
    }

    return (
        <LiveBrowser
            routePrefix={AppRoutes.teams.children.meeting.base}
            offer={offer}
        />
    );
};
