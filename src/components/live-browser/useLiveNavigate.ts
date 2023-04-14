import { useCallback, useEffect } from "react";
import { useLiveState } from "@microsoft/live-share-react";
import { useLocation, useNavigate } from "react-router-dom";

const ROUTE_KEY = "ROUTE_KEY";

export const useLiveNavigate = (): (route: string) => void => {
    const location = useLocation();
    const navigate = useNavigate();
    const [remoteRoute, _, setRemoteRoute] = useLiveState<string>(ROUTE_KEY, location.pathname);
    console.log(remoteRoute);

    const onNavigate = useCallback((route: string) => {
        console.log("setting", route);
        setRemoteRoute(route);
    }, [setRemoteRoute]);

    useEffect(() => {
        if (!remoteRoute || location.pathname === remoteRoute) return;
        navigate(remoteRoute + window.location.hash ?? "");
    }, [remoteRoute, navigate]);

    return onNavigate;
}
