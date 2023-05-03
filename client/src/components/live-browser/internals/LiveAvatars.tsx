import { PresenceState } from "@microsoft/live-share";
import { FC } from "react";
import {
    AvatarGroup,
    AvatarGroupItem,
    AvatarGroupPopover,
    partitionAvatarGroupItems,
} from "@fluentui/react-components";
import { useAppContext } from "../../../context";

interface ILiveAvatarsProps {}

export const LiveAvatars: FC<ILiveAvatarsProps> = () => {
    const { allUsers } = useAppContext();
    const { inlineItems, overflowItems } = partitionAvatarGroupItems({
        items: allUsers
            .filter((user) => user.data && user.state === PresenceState.online)
            .map((user) => user.data!.displayName),
    });

    return (
        <AvatarGroup layout="stack">
            {inlineItems.map((name) => (
                <AvatarGroupItem name={name} key={name} />
            ))}

            {overflowItems && (
                <AvatarGroupPopover>
                    {overflowItems.map((name) => (
                        <AvatarGroupItem name={name} key={name} title={name} />
                    ))}
                </AvatarGroupPopover>
            )}
        </AvatarGroup>
    );
};
