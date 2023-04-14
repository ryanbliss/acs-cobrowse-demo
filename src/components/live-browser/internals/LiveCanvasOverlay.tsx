import { useLiveCanvas, useSharedState } from "@microsoft/live-share-react";
import { InkingTool, PointerInputProvider } from "@microsoft/live-share-canvas";
import { FC, useRef, useEffect, useState, MutableRefObject } from "react";
import { Button, tokens } from "@fluentui/react-components";
import { NonClickablePointerInputProvider } from "../../../utils";
import { FlexRow } from "../../flex";

interface ILiveCanvasOverlayProps {
    width: number;
    hostRef: MutableRefObject<HTMLElement | null>;
}

export const LiveCanvasOverlay: FC<ILiveCanvasOverlayProps> = ({
    width,
    hostRef,
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [penActive, setPenActive] = useSharedState("pen-active", false);
    const { inkingManager } = useLiveCanvas(
        "live-canvas",
        canvasRef,
        true,
        InkingTool.pen,
        undefined,
        undefined,
        undefined,
        "topLeft",
        true
    );
    useEffect(() => {
        canvasRef.current!.onclick = (e) => {
            e.preventDefault();
        };
    }, []);
    useEffect(() => {
        const hostElement = hostRef?.current;
        if (!inkingManager || !hostElement) return;
        const inputProvider = penActive
            ? new PointerInputProvider(
                  canvasRef!.current!.getElementsByTagName("canvas")[0]
              )
            : new NonClickablePointerInputProvider(hostElement);
        inputProvider.activate();
        inkingManager.inputProvider = inputProvider;
        return () => {
            inputProvider.deactivate();
        };
    }, [inkingManager, hostRef, penActive]);

    const widthRemainder = window.document.body.clientWidth - width;
    const hOffset = widthRemainder / 2;
    return (
        <>
            <div
                ref={canvasRef}
                style={{
                    position: "absolute",
                    left: `${hOffset}px`,
                    right: `${hOffset}px`,
                    bottom: 0,
                    top: 0,
                    width: `${width}px`,
                    zIndex: 1,
                    pointerEvents: penActive ? "auto" : "none",
                    backgroundColor: "transparent",
                }}
            />
            <FlexRow
                style={{
                    padding: "4px",
                    backgroundColor: tokens.colorBrandBackground2,
                    bottom: "4px",
                    right: "4px",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "4px",
                }}
            >
                <Button
                    appearance="subtle"
                    onClick={() => {
                        setPenActive(!penActive);
                    }}
                >
                    {penActive ? "Disable pen" : "Enable pen"}
                </Button>
                <Button
                    appearance="subtle"
                    onClick={() => {
                        inkingManager?.clear();
                    }}
                >
                    {"Clear"}
                </Button>
            </FlexRow>
        </>
    );
};
