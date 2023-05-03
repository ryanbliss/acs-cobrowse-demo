import { useCallback, useEffect } from "react";
import { useLiveState } from "@microsoft/live-share-react";
import { useLocation, useNavigate } from "react-router-dom";
import { LiveRoutePrefix } from "../../../constants";

const ROUTE_KEY = "ROUTE_KEY";

const ROUTE_PREFIX_REPLACE_TEXT = ":prefix";

export const useLiveNavigate = (routePrefix: LiveRoutePrefix): (route: string) => void => {
    const location = useLocation();
    const navigate = useNavigate();
    const [remoteRoute, setRemoteRoute] = useLiveState<string>(ROUTE_KEY, location.pathname);

    const onNavigate = useCallback((route: string) => {
        setRemoteRoute(route.replace(routePrefix, ROUTE_PREFIX_REPLACE_TEXT));
    }, [routePrefix, setRemoteRoute]);

    useEffect(() => {
        if (!remoteRoute || location.pathname === remoteRoute) return;
        navigate(remoteRoute.replace(ROUTE_PREFIX_REPLACE_TEXT, routePrefix) + window.location.hash ?? "");
    }, [routePrefix, remoteRoute, navigate]);

    return onNavigate;
}
