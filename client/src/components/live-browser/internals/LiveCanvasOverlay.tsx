import { useLiveCanvas } from "@microsoft/live-share-react";
import { InkingTool, PointerInputProvider } from "@microsoft/live-share-canvas";
import { FC, useRef, useEffect, MutableRefObject, useState } from "react";
import { NonClickablePointerInputProvider } from "../../../utils";
import { useAppContext } from "../../../context";
import { LiveSessionFloatingControls } from "./LiveSessionFloatingControls";

interface ILiveCanvasOverlayProps {
    hostRef: MutableRefObject<HTMLElement | null>;
}

export const LiveCanvasOverlay: FC<ILiveCanvasOverlayProps> = ({
    hostRef,
}) => {
    const { localUser, width, height } = useAppContext();
    const canvasRef = useRef<HTMLDivElement>(null);
    const [inkingActive, setInkingActive] = useState(false);
    const { inkingManager } = useLiveCanvas(
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
            displayName: localUser?.data?.displayName,
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
        const inputProvider = inkingActive
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
    }, [inkingManager, hostRef, inkingActive, hOffset, vOffset]);

    return (
        <>
            <div
                ref={canvasRef}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: `${height}px`,
                    width: `${width}px`,
                    zIndex: 1,
                    pointerEvents: inkingActive ? "auto" : "none",
                    backgroundColor: "transparent",
                }}
            />
            <LiveSessionFloatingControls
                inkingActive={inkingActive}
                inkingManager={inkingManager}
                setInkingActive={setInkingActive}
            />
        </>
    );
};
