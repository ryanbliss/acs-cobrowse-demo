import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    // teamsLightTheme,
    teamsDarkTheme,
    // teamsHighContrastTheme,
    FluentProvider,
} from "@fluentui/react-components";
import { AppRoutes } from "./constants";
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

function App() {
    return (
        <FluentProvider
            theme={teamsDarkTheme}
            // style={{
            //     backgroundColor: "transparent",
            // }}
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
