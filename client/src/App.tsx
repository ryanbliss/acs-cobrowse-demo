import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    teamsLightTheme,
    teamsDarkTheme,
    teamsHighContrastTheme,
    FluentProvider,
} from "@fluentui/react-components";
import { AppRoutes, IN_TEAMS } from "./constants";
import {
    HomePage,
    TeamsConfigPage,
    TeamsMeetingStagePage,
    TeamsPage,
    TeamsSidePanelPage,
    BrowseHomePage,
    BrowseAboutPage,
    ACSPage,
    ACSJoinMeetingPage,
    ACSMeetingPage,
} from "./pages";
import { useEffect, useRef, useState } from "react";
import { app } from "@microsoft/teams-js";

function App() {
    const startedInitializingRef = useRef(false);
    const [initialized, setInitialized] = useState(false);
    const [teamsTheme, setTeamsTheme] = useState(teamsLightTheme);

    useEffect(() => {
        // This hook should only be called once, so we use a ref to track if it has been called.
        // This is a workaround for the fact that useEffect is called twice on initial render in React V18.
        // In production, you might consider using React Suspense if you are using React V18.
        // We are not doing this here because many customers are still using React V17.
        // We are monitoring the React Suspense situation closely and may revisit in the future.
        if (startedInitializingRef.current) return;
        startedInitializingRef.current = true;

        if (!IN_TEAMS) return;

        const initialize = async () => {
            try {
                console.log("App.tsx: initializing client SDK");
                await app.initialize();
                console.log("App.tsx: initialized client SDK");
                app.notifyAppLoaded();
                app.notifySuccess();
                setInitialized(true);
                const context = await app.getContext();
                const curTheme = context.app.theme;
                switch (curTheme) {
                    case "dark":
                        setTeamsTheme(teamsDarkTheme);
                        break;
                    case "contrast":
                        setTeamsTheme(teamsHighContrastTheme);
                        break;
                    case "default":
                    default:
                        setTeamsTheme(teamsLightTheme);
                        break;
                }
                app.registerOnThemeChangeHandler(
                    (theme: string | undefined) => {
                        if (theme == "dark") {
                            setTeamsTheme(teamsDarkTheme);
                        } else if (theme == "contrast") {
                            setTeamsTheme(teamsHighContrastTheme);
                        } else {
                            setTeamsTheme(teamsLightTheme);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };
        initialize();
    }, []);

    const appReady = (IN_TEAMS && initialized) || !IN_TEAMS;
    if (!appReady) return null;

    return (
        <FluentProvider
            theme={teamsTheme}
            style={{
                backgroundColor: IN_TEAMS ? "transparent" : undefined,
            }}
        >
            <Router window={window} basename="/">
                <Routes>
                    <Route path={AppRoutes.home} element={<HomePage />} />
                    <Route path={AppRoutes.teams.base} element={<TeamsPage />}>
                        <Route
                            path={AppRoutes.teams.children.config}
                            element={<TeamsConfigPage />}
                        />
                        <Route
                            path={AppRoutes.teams.children.sidePanel}
                            element={<TeamsSidePanelPage />}
                        />
                        <Route
                            path={AppRoutes.teams.children.meeting.base}
                            element={<TeamsMeetingStagePage />}
                        >
                            <Route
                                path={
                                    AppRoutes.teams.children.meeting.children
                                        .home
                                }
                                element={<BrowseHomePage />}
                            />
                            <Route
                                path={
                                    AppRoutes.teams.children.meeting.children
                                        .about
                                }
                                element={<BrowseAboutPage />}
                            />
                        </Route>
                    </Route>
                    <Route path={AppRoutes.acs.base} element={<ACSPage />}>
                        <Route
                            path={AppRoutes.acs.children.meetingJoin}
                            element={<ACSJoinMeetingPage />}
                        />
                        <Route
                            path={AppRoutes.acs.children.meeting.base}
                            element={<ACSMeetingPage />}
                        >
                            <Route
                                path={
                                    AppRoutes.acs.children.meeting.children
                                        .home
                                }
                                element={<BrowseHomePage />}
                            />
                            <Route
                                path={
                                    AppRoutes.acs.children.meeting.children
                                        .about
                                }
                                element={<BrowseAboutPage />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </FluentProvider>
    );
}

export default App;
