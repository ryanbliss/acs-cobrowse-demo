import { FC, ReactNode, createContext, useContext } from "react";
import { PresenceUser } from "../interfaces";

interface IAppContextProviderProps {
    navigate: (route: string) => void;
    width: number;
    height: number;
    allUsers: PresenceUser[];
    localUser: PresenceUser | undefined;
    children?: ReactNode;
}

export const AppContextProvider: FC<IAppContextProviderProps> = ({
    children,
    width,
    height,
    allUsers,
    localUser,
    navigate,
}) => {
    return (
        <AppContext.Provider
            value={{
                navigate,
                width,
                height,
                allUsers,
                localUser,
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
}

const AppContext = createContext<IAppContext>(
    {} as IAppContext
);
export const useAppContext = (): IAppContext =>
    useContext(AppContext);
