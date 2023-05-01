/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the Microsoft Live Share SDK License.
 */

import {
    IFluidContainerInfo,
    IFluidTenantInfo,
    ILiveShareHost,
    INtpTimeInfo,
    UserMeetingRole,
} from "@microsoft/live-share";

const LiveShareRoutePrefix = '/livesync/v1/acs';
const LiveShareBaseUrl = 'https://teams.microsoft.com/api/platform';
const GetNtpTimeRoute = 'getNTPTime';
const GetFluidTenantInfoRoute = 'fluid/tenantInfo/get';
const RegisterClientRolesRoute = 'clientRoles/register';
const ClientRolesGetRoute = 'clientRoles/get';
const FluidTokenGetRoute = 'fluid/token/get';
const FluidContainerGetRoute = 'fluid/container/get';
const FluidContainerSetRoute = 'fluid/container/set';

// TODO: move into separate NPM package
export class AcsLiveShareHost implements ILiveShareHost {
    private constructor(
        private readonly acsTokenProvider: () => string,
        private readonly skypeUserId: string,
        private readonly meetingJoinUrl: string
    ) {}

    public static create(options: AcsLiveShareHostOptions): ILiveShareHost {
        return new AcsLiveShareHost(
            options.acsTokenProvider,
            options.acsUserId,
            options.teamsMeetingJoinUrl
        );
    }

    async getClientRoles(
        clientId: string
    ): Promise<UserMeetingRole[] | undefined> {
        const request = this.constructBaseRequest() as FluidClientRolesInput;
        request.clientId = clientId;
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${ClientRolesGetRoute}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `SkypeToken ${this.acsTokenProvider()}`,
                },
                body: JSON.stringify(request),
            }
        );
        const data = await response.json();
        return data.roles;
    }

    async getFluidContainerId(): Promise<IFluidContainerInfo> {
        const request = this.constructBaseRequest() as FluidGetContainerIdInput;
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${FluidContainerGetRoute}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `SkypeToken ${this.acsTokenProvider()}`,
                },
                body: JSON.stringify(request),
            }
        );
        const data = await response.json();
        return data;
    }

    async getFluidTenantInfo(): Promise<IFluidTenantInfo> {
        const request = this.constructBaseRequest() as FluidTenantInfoInput;
        request.expiresAt = 0;
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${GetFluidTenantInfoRoute}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `SkypeToken ${this.acsTokenProvider()}`,
                },
                body: JSON.stringify(request),
            }
        );

        const data = await response.json();
        return data.broadcaster.frsTenantInfo;
    }

    async getFluidToken(containerId?: string): Promise<string> {
        const request = this.constructBaseRequest() as FluidGetTokenInput;
        request.containerId = containerId;
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${FluidTokenGetRoute}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `SkypeToken ${this.acsTokenProvider()}`,
                },
                body: JSON.stringify(request),
            }
        );
        const data = await response.json();
        return data.token;
    }

    async getNtpTime(): Promise<INtpTimeInfo> {
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${GetNtpTimeRoute}`,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    }

    async registerClientId(clientId: string): Promise<UserMeetingRole[]> {
        const request = this.constructBaseRequest() as FluidClientRolesInput;
        request.clientId = clientId;
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${RegisterClientRolesRoute}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `SkypeToken ${this.acsTokenProvider()}`,
                },
                body: JSON.stringify(request),
            }
        );
        const data = await response.json();
        return data;
    }

    async setFluidContainerId(
        containerId: string
    ): Promise<IFluidContainerInfo> {
        const request = this.constructBaseRequest() as FluidSetContainerIdInput;
        request.containerId = containerId;
        const response = await fetch(
            `${LiveShareBaseUrl}/${LiveShareRoutePrefix}/${FluidContainerSetRoute}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `SkypeToken ${this.acsTokenProvider()}`,
                },
                body: JSON.stringify(request),
            }
        );
        const data = await response.json();
        return data;
    }

    private constructBaseRequest(): LiveShareRequestBase {
        const originUri = window.location.href;
        return {
            originUri,
            teamsContextType: TeamsCollabContextType.MeetingJoinUrl,
            teamsContext: {
                meetingJoinUrl: this.meetingJoinUrl,
                skypeMri: this.skypeUserId,
            },
        };
    }
}
export interface AcsLiveShareHostOptions {
    acsUserId: string;
    teamsMeetingJoinUrl: string;
    acsTokenProvider: () => string;
}
interface FluidTenantInfoInput {
    appId?: string;
    originUri: string;
    teamsContextType: TeamsCollabContextType;
    teamsContext: TeamsContext;
    expiresAt: number;
}
interface FluidGetContainerIdInput extends LiveShareRequestBase {}
interface TeamsContext {
    meetingJoinUrl?: string;
    skypeMri?: string;
}
interface FluidSetContainerIdInput extends LiveShareRequestBase {
    containerId: string;
}
interface FluidClientRolesInput extends LiveShareRequestBase {
    clientId: string;
}
interface FluidGetTokenInput {
    appId?: string;
    originUri: string;
    teamsContextType: TeamsCollabContextType;
    teamsContext: TeamsContext;
    containerId?: string;
    // TODO: these are not used on server side    // userId?: string;    // userName?: string;
}
enum TeamsCollabContextType {
    MeetingJoinUrl = 1,
    GroupChatId,
}
interface LiveShareRequestBase {
    appId?: string;
    originUri: string;
    teamsContextType: TeamsCollabContextType;
    teamsContext: TeamsContext;
}
