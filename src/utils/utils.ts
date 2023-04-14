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
