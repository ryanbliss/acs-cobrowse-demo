import { FC } from "react";
import { Outlet } from "react-router-dom";
import { FlexColumn } from "../../components";
import { tokens } from "@fluentui/react-theme";

export const ACSPage: FC = () => {
    return (
        <FlexColumn
            fill="view"
            hAlign="center"
            style={{ backgroundColor: tokens.colorNeutralBackground2 }}
        >
            <Outlet />
        </FlexColumn>
    );
};
