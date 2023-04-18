
const TEAMS_BASE_ROUTE = "/teams";
const ACS_BASE_ROUTE = "/acs";
export const AppRoutes = {
    home: "/",
    teams: {
        base: TEAMS_BASE_ROUTE,
        children: {
            config: TEAMS_BASE_ROUTE + "/config",
            meeting: {
                base: TEAMS_BASE_ROUTE + "/meeting",
                children: {
                    home: TEAMS_BASE_ROUTE + "/meeting/",
                    about: TEAMS_BASE_ROUTE + "/meeting/about",
                },
            },
            sidePanel: TEAMS_BASE_ROUTE + "/side-panel",
        },
    },
    acs: {
        base: ACS_BASE_ROUTE,
        children: {
            meetingJoin: ACS_BASE_ROUTE + "/meeting-join",
            meeting: {
                base: ACS_BASE_ROUTE + "/meeting",
                children: {
                    home: ACS_BASE_ROUTE + "/meeting/",
                    about: ACS_BASE_ROUTE + "/meeting/about",
                },
            },
        },
    },
}