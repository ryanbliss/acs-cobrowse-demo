// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
    CallAdapter,
    CallComposite,
    CallCompositeOptions,
} from "@azure/communication-react";
import { FC, memo } from "react";

const ACS_OPTIONS: CallCompositeOptions = {
    errorBar: true,
    callControls: {
        cameraButton: true,
        displayType: "compact",
        microphoneButton: true,
        screenShareButton: false,
        endCallButton: true,
        participantsButton: false,
    },
};

export interface IACSCallProps {
    adapter: CallAdapter;
    formFactor?: 'desktop' | 'mobile';
}

export const ACSCall: FC<IACSCallProps> = memo(({adapter, formFactor='desktop'}) => {

    const callInvitationUrl: string | undefined = window.location.href;

    return (
        <CallComposite
            adapter={adapter}
            callInvitationUrl={callInvitationUrl}
            formFactor={formFactor}
            options={ACS_OPTIONS}
        />
    );
});
