import {
    AzureCommunicationTokenCredential,
    CommunicationTokenRefreshOptions,
} from "@azure/communication-common";
import { AbortSignalLike } from "@azure/abort-controller";

export function getFluidEnvironment(): "teams" | "acs" | "local" {
    const currentUrl = window.location.href;
    // Check if using HistoryRouter
    const url = currentUrl.includes("/#/")
        ? new URL(`${window.location.href.split("/#/").join("/")}`)
        : new URL(window.location.href);
    const params = url.searchParams;
    const env = params.get("fluidEnv");
    if (env && ["teams", "acs", "local"].includes(env)) {
        return env as "teams" | "acs" | "local";
    }
    return "local";
}

export function fillArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
}

export const fetchTokenResponse = async (): Promise<ITokenResponse> => {
    const response = await fetch("/token?scope=voip");
    if (response.ok) {
        const responseAsJson = await response.json();
        if (isTokenResponse(responseAsJson)) {
            return responseAsJson;
        }
    }
    throw new Error("Invalid token response");
};

export interface ITokenResponse {
    token: string;
    user: string;
}

function isTokenResponse(value: any): value is ITokenResponse {
    return (
        typeof value === "object" &&
        typeof value.token === "string" &&
        typeof value.user === "string"
    );
}

/**
 * Create credentials that auto-refresh asynchronously.
 */
export const createAutoRefreshingCredential = (
    userId: string,
    token: string
): AzureCommunicationTokenCredential => {
    const options: CommunicationTokenRefreshOptions = {
        token: token,
        tokenRefresher: refreshTokenAsync(userId),
        refreshProactively: true,
    };

    return new AzureCommunicationTokenCredential(options);
};

const postRefreshTokenParameters = {
    method: "POST",
};

const refreshTokenAsync = (
    userIdentity: string
): ((abortSignal?: AbortSignalLike) => Promise<string>) => {
    return async (): Promise<string> => {
        const response = await fetch(
            `/refreshToken/${userIdentity}`,
            postRefreshTokenParameters
        );
        if (response.ok) {
            return (await response.json()).token;
        } else {
            throw new Error("could not refresh token");
        }
    };
};
