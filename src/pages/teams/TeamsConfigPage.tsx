/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { pages } from "@microsoft/teams-js";
import { FC, useEffect } from "react";
import { Title2, Subtitle2 } from "@fluentui/react-components";
import { AppRoutes } from "../../constants";
import { FlexColumn } from "../../components";

export const TeamsConfigPage: FC = () => {
    useEffect(() => {
        pages.config.registerOnSaveHandler(function (saveEvent) {
            pages.config.setConfig({
                suggestedDisplayName: "CoBrowse",
                contentUrl: `${window.location.origin}${AppRoutes.teams.children.sidePanel}?inTeams=true`,
            });
            saveEvent.notifySuccess();
        });

        pages.config.setValidityState(true);
    }, []);

    return (
        <FlexColumn gap="small">
            <Title2 as="h2" block align="center">
                Welcome to Contoso Media!
            </Title2>
            <Subtitle2 as="p" block align="center">
                Press the save button to continue.
            </Subtitle2>
        </FlexColumn>
    );
};
