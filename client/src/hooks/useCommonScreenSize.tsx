import { PresenceUser } from "../interfaces";
import { PresenceState } from "@microsoft/live-share";

export const useCommonScreenSize = (allUsers: PresenceUser[]): {
    commonWidth: number,
    commonHeight: number,
} => {
    const onlineUsers = allUsers.filter(
        (user) => user.state === PresenceState.online
    );
    const sortedWidthUsers = [...onlineUsers].sort(
        (a, b) => (a.data?.screenWidth || 0) - (b.data?.screenWidth || 0)
    );
    const width =
        sortedWidthUsers.length > 0 ? sortedWidthUsers[0].data?.screenWidth : 0;
    const sortedHeightUsers = [...onlineUsers].sort(
        (a, b) => (a.data?.screenHeight || 0) - (b.data?.screenHeight || 0)
    );
    const height =
        sortedHeightUsers.length > 0
            ? sortedHeightUsers[0].data?.screenHeight
            : 0;
    return {
        commonWidth: width ?? 0,
        commonHeight: height ?? 0,
    };
}
