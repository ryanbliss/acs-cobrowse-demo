import { FC, ReactNode, createContext, useContext } from "react";
import { IOffer, PresenceUser } from "../interfaces";
import { LiveRoutePrefix } from "../constants";

interface ILiveBrowserProviderProps {
    allUsers: PresenceUser[];
    children?: ReactNode;
    commonHeight: number;
    commonWidth: number;
    localUser: PresenceUser | undefined;
    navigate: (route: string) => void;
    routePrefix: LiveRoutePrefix;
    offer: IOffer;
}

export const LiveBrowserContextProvider: FC<ILiveBrowserProviderProps> = ({
    allUsers,
    children,
    commonHeight,
    commonWidth,
    localUser,
    navigate,
    routePrefix,
    offer,
}) => {
    return (
        <LiveBrowserContext.Provider
            value={{
                navigate,
                commonWidth,
                commonHeight,
                allUsers,
                localUser,
                routePrefix,
                offer,
            }}
        >
            {children}
        </LiveBrowserContext.Provider>
    );
};

interface ILiveBrowserContext {
    navigate: (route: string) => void;
    commonWidth: number;
    commonHeight: number;
    allUsers: PresenceUser[];
    localUser: PresenceUser | undefined;
    routePrefix: LiveRoutePrefix;
    offer: IOffer;
}

const LiveBrowserContext = createContext<ILiveBrowserContext>(
    {} as ILiveBrowserContext
);
export const useLiveBrowserContext = (): ILiveBrowserContext =>
    useContext(LiveBrowserContext);
