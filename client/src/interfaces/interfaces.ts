import { LivePresenceUser } from "@microsoft/live-share";

export interface IUserData {
    // TODO: remove once new presence changes are in
    displayName: string;
    screenWidth: number;
    screenHeight: number;
}

export type PresenceUser = LivePresenceUser<IUserData>;
