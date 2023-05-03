import { FC, ReactNode, createContext, useContext } from "react";
import { PresenceUser } from "../interfaces";
import { LiveRoutePrefix } from "../constants";

interface IAppContextProviderProps {
    allUsers: PresenceUser[];
    children?: ReactNode;
    height: number;
    localUser: PresenceUser | undefined;
    navigate: (route: string) => void;
    routePrefix: LiveRoutePrefix;
    width: number;
}

export const AppContextProvider: FC<IAppContextProviderProps> = ({
    allUsers,
    children,
    height,
    localUser,
    navigate,
    routePrefix,
    width,
}) => {
    return (
        <AppContext.Provider
            value={{
                navigate,
                width,
                height,
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
    width: number;
    height: number;
    allUsers: PresenceUser[];
    localUser: PresenceUser | undefined;
    routePrefix: LiveRoutePrefix;
}

const AppContext = createContext<IAppContext>(
    {} as IAppContext
);
export const useAppContext = (): IAppContext =>
    useContext(AppContext);
