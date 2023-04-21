import { useLiveCanvas, useSharedState } from "@microsoft/live-share-react";
import { InkingTool, PointerInputProvider } from "@microsoft/live-share-canvas";
import { FC, useRef, useEffect, useState, MutableRefObject } from "react";
import { Button, tokens } from "@fluentui/react-components";
import { NonClickablePointerInputProvider } from "../../../utils";
import { FlexRow } from "../../flex";

interface ILiveCanvasOverlayProps {
    displayName: string;
    width: number;
    height: number;
    hostRef: MutableRefObject<HTMLElement | null>;
}

export const LiveCanvasOverlay: FC<ILiveCanvasOverlayProps> = ({
    displayName,
    width,
    height,
    hostRef,
}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [penActive, setPenActive] = useSharedState("pen-active", false);
    const { inkingManager, liveCanvas } = useLiveCanvas(
        "live-canvas",
        canvasRef,
        true,
        InkingTool.pen,
        undefined,
        undefined,
        undefined,
        "topLeft",
        true,
        {
            displayName,
        },
    );
    useEffect(() => {
        canvasRef.current!.onclick = (e) => {
            e.preventDefault();
        };
    }, []);

    const widthRemainder = window.document.body.clientWidth - width;
    const hOffset = widthRemainder / 2;

    const heightRemainder = window.document.body.clientHeight - height;
    const vOffset = heightRemainder / 2;

    useEffect(() => {
        const hostElement = hostRef?.current;
        if (!inkingManager || !hostElement) return;
        const inputProvider = penActive
            ? new PointerInputProvider(
                  canvasRef!.current!.getElementsByTagName("canvas")[0]
              )
            : new NonClickablePointerInputProvider(
                  hostElement,
                  hOffset,
                  vOffset
              );
        inputProvider.activate();
        inkingManager.inputProvider = inputProvider;
        return () => {
            inputProvider.deactivate();
        };
    }, [inkingManager, hostRef, penActive, hOffset, vOffset]);

    useEffect(() => {
        // TODO: this should be handled inside of the `useLiveCanvas` hook, but there is a bug...so this handles that.
        if (!liveCanvas) return;
        liveCanvas.onGetLocalUserInfo = () => ({
            displayName,
        });
    }, [displayName, liveCanvas]);

    return (
        <>
            <div
                ref={canvasRef}
                style={{
                    position: "absolute",
                    // left: `${hOffset}px`,
                    // right: `${hOffset}px`,
                    // top: `${vOffset}px`,
                    // bottom: `${vOffset}px`,
                    left: 0,
                    top: 0,
                    height: `${height}px`,
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
                    bottom: "8px",
                    left: "8px",
                    position: "fixed",
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
