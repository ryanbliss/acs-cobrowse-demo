import { FC } from "react";
import { FlexRow } from "../../common/flex";
import { tokens } from "@fluentui/react-theme";
import { InkingControls } from "./InkingControls";
import { Button } from "@fluentui/react-components";
import { InkingManager } from "@microsoft/live-share-canvas";
import { useAppContext } from "../../../context";

interface ILiveSessionFloatingControlsProps {
    inkingManager?: InkingManager;
    inkingActive: boolean;
    setInkingActive: (enabled: boolean) => void;
}

export const LiveSessionFloatingControls: FC<
    ILiveSessionFloatingControlsProps
> = ({ inkingManager, inkingActive, setInkingActive }) => {
    const { width } = useAppContext();
    return (
        <FlexRow
            hAlign="center"
            style={{
                bottom: "24px",
                left: 0,
                width: `${width}px`,
                position: "fixed",
                zIndex: 3,
                borderRadius: "4px",
                shadow: tokens.shadow28,
                pointerEvents: "none",
            }}
        >
            <FlexRow
                vAlign="center"
                style={{
                    paddingLeft: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    paddingRight: "4px",
                    backgroundColor: tokens.colorNeutralBackground6,
                    borderRadius: "4px",
                    shadow: tokens.shadow28,
                    pointerEvents: "auto",
                }}
            >
                {inkingManager && (
                    <InkingControls
                        inkingManager={inkingManager}
                        isEnabled={inkingActive}
                        setIsEnabled={setInkingActive}
                    />
                )}
                <Button
                    appearance="subtle"
                    size="small"
                    onClick={() => {
                        inkingManager?.clear();
                    }}
                >
                    {"Clear"}
                </Button>
            </FlexRow>
        </FlexRow>
    );
};
