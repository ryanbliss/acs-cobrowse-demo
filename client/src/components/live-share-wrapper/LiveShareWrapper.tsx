import { FC, ReactNode } from "react";
import { ILiveShareHost } from "@microsoft/live-share";
import { LiveShareProvider } from "@microsoft/live-share-react";

interface ILiveShareWrapperProps {
    host: ILiveShareHost;
    children: ReactNode;
}

export const LiveShareWrapper: FC<ILiveShareWrapperProps> = ({ children, host }) => {
    return (
        <LiveShareProvider host={host} joinOnLoad>
            { children }
        </LiveShareProvider>
    )
};