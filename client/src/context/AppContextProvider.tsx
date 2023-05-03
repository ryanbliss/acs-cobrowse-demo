import { FC, ReactNode, createContext, useContext } from "react";
import { PresenceUser } from "../interfaces";
import { LiveRoutePrefix } from "../constants";

interface IAppContextProviderProps {
    allUsers: PresenceUser[];
    children?: ReactNode;
    commonHeight: number;
    commonWidth: number;
    localUser: PresenceUser | undefined;
    navigate: (route: string) => void;
    routePrefix: LiveRoutePrefix;
}

export const AppContextProvider: FC<IAppContextProviderProps> = ({
    allUsers,
    children,
    commonHeight,
    commonWidth,
    localUser,
    navigate,
    routePrefix,
}) => {
    return (
        <AppContext.Provider
            value={{
                navigate,
                commonWidth: commonWidth,
                commonHeight: commonHeight,
                allUsers,
                localUser,
                routePrefix,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

interface IAppContext {
    navigate: (route: string) => void;
    commonWidth: number;
    commonHeight: number;
    allUsers: PresenceUser[];
    localUser: PresenceUser | undefined;
    routePrefix: LiveRoutePrefix;
}

const AppContext = createContext<IAppContext>(
    {} as IAppContext
);
export const useAppContext = (): IAppContext =>
    useContext(AppContext);
