
const TEAMS_BASE_ROUTE = "/teams";
const ACS_BASE_ROUTE = "/acs";

export enum LiveRoutePrefix {
    TEAMS = "/teams/meeting",
    ACS = "/acs/meeting",
}

export const AppRoutes = {
    home: "/",
    teams: {
        base: TEAMS_BASE_ROUTE,
        children: {
            config: TEAMS_BASE_ROUTE + "/config",
            meeting: {
                base: LiveRoutePrefix.TEAMS,
                children: {
                    home: LiveRoutePrefix.TEAMS + "/",
                    about: LiveRoutePrefix.TEAMS + "/about",
                    offerSignUp: LiveRoutePrefix.TEAMS + "/offer-sign-up",
                    offerThankYou: LiveRoutePrefix.TEAMS + "/offer-thank-you",
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
                base: LiveRoutePrefix.ACS,
                children: {
                    home: LiveRoutePrefix.ACS + "/",
                    about: LiveRoutePrefix.ACS + "/about",
                    offerSignUp: LiveRoutePrefix.ACS + "/offer-sign-up",
                    offerThankYou: LiveRoutePrefix.ACS + "/offer-thank-you",
                },
            },
        },
    },
}