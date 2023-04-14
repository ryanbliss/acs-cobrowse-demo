import { FC } from "react";
import { FlexRow } from "../flex";
import { Button } from "@fluentui/react-components";

interface INavigationBarProps {
    routePrefix: string;
    navigate: (route: string) => void;
}

export const NavigationBar: FC<INavigationBarProps> = ({ routePrefix, navigate }) => {
    return (
        <FlexRow vAlign="center">
            <Button appearance="subtle" onClick={() => {
                navigate(routePrefix + "/");
            }}>
                {"Home"}
            </Button>
            <Button appearance="subtle" onClick={() => {
                navigate(routePrefix + "/about");
            }}>
                {"About"}
            </Button>
        </FlexRow>
    );
}
