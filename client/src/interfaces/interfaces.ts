import { LivePresenceUser } from "@microsoft/live-share";

export interface IUserData {
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