import { FC, useRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { app } from "@microsoft/teams-js";
import { IN_TEAMS } from "../../constants";
import { FlexColumn } from "../../components";
import { tokens } from "@fluentui/react-theme";

export const TeamsPage: FC = () => {
    const initializeStartedRef = useRef(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        // This hook should only be called once, so we use a ref to track if it has been called.
        // This is a workaround for the fact that useEffect is called twice on initial render in React V18.
        // In production, you might consider using React Suspense if you are using React V18.
        // We are not doing this here because many customers are still using React V17.
        // We are monitoring the React Suspense situation closely and may revisit in the future.
        if (initializeStartedRef.current || !IN_TEAMS) return;
        initializeStartedRef.current = true;
        const initialize = async () => {
            try {
                console.log("App.js: initializing client SDK initialized");
                await app.initialize();
                app.notifyAppLoaded();
                app.notifySuccess();
                setInitialized(true);
            } catch (error) {
                console.error(error);
            }
        };
        console.log("App.js: initializing client SDK");
        initialize();
    }, []);

    const appReady = (IN_TEAMS && initialized) || !IN_TEAMS;
    if (!appReady) {
        return <></>;
    }
    return (
        <FlexColumn
            fill="view"
            hAlign="start"
            style={{ backgroundColor: tokens.colorNeutralBackgroundInverted }}
        >
            <Outlet />
        </FlexColumn>
    );
};
