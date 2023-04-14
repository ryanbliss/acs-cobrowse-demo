import { getFluidEnvironment } from "../utils";

export * from "./AppRoutes";
export const FLUID_ENVIRONMENT = getFluidEnvironment();
export const IN_TEAMS = FLUID_ENVIRONMENT === "teams";
