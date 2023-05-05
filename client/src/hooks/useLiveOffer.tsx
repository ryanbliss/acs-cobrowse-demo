import { SetLiveStateAction, useLiveState } from "@microsoft/live-share-react";
import { IOffer } from "../interfaces";
import { UserMeetingRole } from "@microsoft/live-share";

const LIVE_OFFER_KEY = "live_offer_key";
const ALLOWED_ROLES_LIVE_OFFER = [UserMeetingRole.organizer, UserMeetingRole.presenter];

export const useLiveOffer = (): [
    IOffer | undefined,
    SetLiveStateAction<IOffer | undefined>
] => {
    const [offer, setOffer] = useLiveState<IOffer | undefined>(
        LIVE_OFFER_KEY,
        undefined,
        ALLOWED_ROLES_LIVE_OFFER
    );
    return [offer, setOffer];
};
