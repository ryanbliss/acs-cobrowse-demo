import { useEffect, FC } from "react";
import {
    InkingTool,
    fromCssColor,
    InkingManager,
} from "@microsoft/live-share-canvas";
import { Image } from "@fluentui/react-components";
import { InkingControlButton } from "./InkingControlButton";
import LaserPointerIcon from "../../../assets/laser-pointer.svg";
import PenIcon from "../../../assets/pen.svg";
import HighlighterIcon from "../../../assets/highlighter.svg";
import EraserIcon from "../../../assets/eraser.svg";
import { FlexRow } from "../../common/flex";
import { useLiveState } from "@microsoft/live-share-react";

interface InkingControlsProps {
    inkingManager: InkingManager;
    setIsEnabled: (enabled: boolean) => void;
    isEnabled: boolean;
}

// Seems to be a bug with laser pointer stroke positioning when oriented topLeft in this app, should enable once fixed
const ENABLE_LASER_POINTER = false;

export const InkingControls: FC<InkingControlsProps> = ({
    inkingManager,
    setIsEnabled,
    isEnabled,
}) => {
    const [selectedTool, setSelectedTool] = useLiveState<InkingTool>(
        "selected-inking-tool",
        inkingManager.tool
    );
    const onSelectTool = (tool: InkingTool) => {
        if (tool !== selectedTool) {
            inkingManager.tool = tool;
            setSelectedTool(tool);
        }
        if (isEnabled && tool === selectedTool) {
            setIsEnabled(false);
        } else {
            setIsEnabled(true);
        }
    };

    useEffect(() => {
        if (inkingManager) {
            // Change default color of pen brush
            inkingManager.penBrush.color = fromCssColor("#E3182D");
        }
    }, [inkingManager]);

    return (
        <FlexRow gap="small" style={{ marginLeft: "8px", marginRight: "4px" }}>
            {ENABLE_LASER_POINTER && (
                <InkingControlButton
                    tool={InkingTool.laserPointer}
                    isEnabled={isEnabled}
                    selectedTool={selectedTool}
                    onSelectTool={onSelectTool}
                >
                    <Image src={LaserPointerIcon} width={24} height={24} />
                </InkingControlButton>
            )}
            <InkingControlButton
                tool={InkingTool.pen}
                isEnabled={isEnabled}
                selectedTool={selectedTool}
                onSelectTool={onSelectTool}
            >
                <Image src={PenIcon} width={24} height={24} />
            </InkingControlButton>
            <InkingControlButton
                tool={InkingTool.highlighter}
                isEnabled={isEnabled}
                selectedTool={selectedTool}
                onSelectTool={onSelectTool}
            >
                <Image src={HighlighterIcon} width={24} height={24} />
            </InkingControlButton>
            <InkingControlButton
                tool={InkingTool.eraser}
                isEnabled={isEnabled}
                selectedTool={selectedTool}
                onSelectTool={onSelectTool}
            >
                <Image src={EraserIcon} width={24} height={24} />
            </InkingControlButton>
        </FlexRow>
    );
};
