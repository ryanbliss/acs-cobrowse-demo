import { useLiveCanvas } from "@microsoft/live-share-react";
import { InkingTool } from "@microsoft/live-share-canvas";
import { FC, useRef, useEffect, useState, MutableRefObject } from "react";
import { Button } from "@fluentui/react-components";
import { PointerInputProvider } from "../../../utils";

interface ILiveCanvasOverlayProps {
    width: number;
    hostRef: MutableRefObject<HTMLElement | null>;
}

export const LiveCanvasOverlay: FC<ILiveCanvasOverlayProps> = ({width, hostRef}) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [cursorsActive, setCursorsActive] = useState(true);
    const { inkingManager } = useLiveCanvas(
        "live-canvas",
        canvasRef,
        cursorsActive,
        InkingTool.eraser,
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
        const inputProvider = new PointerInputProvider(hostElement);
        inkingManager.inputProvider = inputProvider;
        return () => {
            inputProvider.deactivate();
        }
    }, [inkingManager, hostRef]);
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
                    pointerEvents: "none",
                    backgroundColor: "transparent",
                }}
            />
            <Button
                onClick={() => {
                    setCursorsActive(!cursorsActive);
                }}
                style={{ bottom: 0, right: 0, position: "absolute", zIndex: 2 }}
            >
                {"Toggle cursors"}
            </Button>
        </>
    );
};
