import { FC } from "react";
import { FlexRow } from "../flex";
import { Button, tokens } from "@fluentui/react-components";

interface INavigationBarProps {
    routePrefix: string;
    navigate: (route: string) => void;
}

export const NavigationBar: FC<INavigationBarProps> = ({ routePrefix, navigate }) => {
    return (
        <FlexRow vAlign="center" style={{
            padding: "8px",
            backgroundColor: tokens.colorNeutralBackground4,
            boxShadow: "2px 4px 48px 0px rgba(0, 0, 0, 0.4)",
        }}>
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
