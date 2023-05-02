import { FC } from "react";
import { FlexRow } from "../../common";
import { Button, tokens } from "@fluentui/react-components";
import { useAppContext } from "../../../context";

interface ILiveNavigationBarProps {
    routePrefix: string;
}

export const LiveNavigationBar: FC<ILiveNavigationBarProps> = ({ routePrefix }) => {
    const { navigate } = useAppContext();
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
