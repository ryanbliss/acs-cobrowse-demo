import { FC } from "react";
import { LiveShareHost, meeting } from "@microsoft/teams-js";
import { AppRoutes, FLUID_ENVIRONMENT, IN_TEAMS } from "../../constants";
import { IOffer } from "../../interfaces";
import { useLiveOffer, useTeamsSharingStatus } from "../../hooks";
import { LiveOfferPicker } from "../../components/live-browser/LiveOfferPicker";
import { LiveShareProvider } from "@microsoft/live-share-react";
import { ILiveShareHost, TestLiveShareHost } from "@microsoft/live-share";

const host: ILiveShareHost = IN_TEAMS
    ? LiveShareHost.create()
    : TestLiveShareHost.create();

export const TeamsSidePanelPage: FC = () => {
    return (
        <LiveShareProvider host={host} joinOnLoad>
            <TeamsSidePanelRender />
        </LiveShareProvider>
    );
};

const TeamsSidePanelRender: FC = () => {
    const [offer, setOffer] = useLiveOffer();
    const sharingActive = useTeamsSharingStatus();

    const onSelectOffer = (selectedOffer: IOffer) => {
        if (offer?.id === selectedOffer.id) return;
        // Set the offer to LiveState
        setOffer(selectedOffer);
        if (sharingActive) return;
        // Share to stage
        let urlToShare = `${window.location.origin}${AppRoutes.teams.children.meeting.base}?fluidEnv=${FLUID_ENVIRONMENT}`;
        if (window.location.hash) {
            urlToShare += window.location.hash;
        }
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
    }

    return (
        <LiveOfferPicker
            selectedOffer={sharingActive ? offer : undefined}
            onSelectOffer={onSelectOffer}
            buttonText="Share to meeting"
        />
    );
}
