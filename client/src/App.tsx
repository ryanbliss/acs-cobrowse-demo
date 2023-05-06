import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    webLightTheme,
    webDarkTheme,
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
    BrowseOfferSignUpPage,
    BrowseOfferThankYouPage,
} from "./pages";
import { useEffect, useRef, useState } from "react";
import { app } from "@microsoft/teams-js";

function App() {
    const startedInitializingRef = useRef(false);
    const [initialized, setInitialized] = useState(false);
    const [teamsTheme, setTeamsTheme] = useState(webLightTheme);

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
                        setTeamsTheme(webDarkTheme);
                        break;
                    case "contrast":
                        setTeamsTheme(teamsHighContrastTheme);
                        break;
                    case "default":
                    default:
                        setTeamsTheme(webLightTheme);
                        break;
                }
                app.registerOnThemeChangeHandler(
                    (theme: string | undefined) => {
                        if (theme == "dark") {
                            setTeamsTheme(webDarkTheme);
                        } else if (theme == "contrast") {
                            setTeamsTheme(teamsHighContrastTheme);
                        } else {
                            setTeamsTheme(webLightTheme);
                        }
                    }
                );
            } catch (error) {
                console.error(error);
            }
        };
        initialize();
    }, []);

    console.log(IN_TEAMS);

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
                            <Route
                                path={
                                    AppRoutes.teams.children.meeting.children
                                        .offerSignUp
                                }
                                element={<BrowseOfferSignUpPage />}
                            />
                            <Route
                                path={
                                    AppRoutes.teams.children.meeting.children
                                        .offerThankYou
                                }
                                element={<BrowseOfferThankYouPage />}
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
                            <Route
                                path={
                                    AppRoutes.acs.children.meeting.children
                                        .offerSignUp
                                }
                                element={<BrowseOfferSignUpPage />}
                            />
                            <Route
                                path={
                                    AppRoutes.acs.children.meeting.children
                                        .offerThankYou
                                }
                                element={<BrowseOfferThankYouPage />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </FluentProvider>
    );
}

export default App;
