import { LivePresenceUser } from "@microsoft/live-share";

export interface IUserData {
    // TODO: remove once new presence changes are in
    displayName: string;
    screenWidth: number;
    screenHeight: number;
}

export type PresenceUser = LivePresenceUser<IUserData>;

export interface IStep {
    title: string;
    body: string;
}

export interface IOffer {
    id: string;
    type: "CHECKING" | "SAVINGS";
    amount: number;
    steps: IStep[];
    expiresFormattedDate: string;
}