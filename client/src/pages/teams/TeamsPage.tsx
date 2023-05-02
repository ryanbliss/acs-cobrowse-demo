import { FC } from "react";
import { Outlet } from "react-router-dom";
import { FlexColumn } from "../../components";

export const TeamsPage: FC = () => {
    return (
        <FlexColumn
            fill="view"
            hAlign="start"
        >
            <Outlet />
        </FlexColumn>
    );
};
