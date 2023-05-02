import { useCallback, useEffect } from "react";
import { useLiveState } from "@microsoft/live-share-react";
import { useLocation, useNavigate } from "react-router-dom";

const ROUTE_KEY = "ROUTE_KEY";

export const useLiveNavigate = (): (route: string) => void => {
    const location = useLocation();
    const navigate = useNavigate();
    const [remoteRoute, setRemoteRoute] = useLiveState<string>(ROUTE_KEY, location.pathname);

    const onNavigate = useCallback((route: string) => {
        setRemoteRoute(route);
    }, [setRemoteRoute]);

    useEffect(() => {
        if (!remoteRoute || location.pathname === remoteRoute) return;
        navigate(remoteRoute + window.location.hash ?? "");
    }, [remoteRoute, navigate]);

    return onNavigate;
}
