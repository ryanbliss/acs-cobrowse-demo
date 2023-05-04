import { useLiveCanvas } from "@microsoft/live-share-react";
import { PointerInputProvider } from "@microsoft/live-share-canvas";
import { FC, useRef, useEffect, MutableRefObject, useState } from "react";
import { NonClickablePointerInputProvider } from "../../../utils";
import { useAppContext } from "../../../context";
import { LiveSessionFloatingControls } from "./LiveSessionFloatingControls";

interface ILiveCanvasOverlayProps {
    pointerElementRef: MutableRefObject<HTMLElement | null>;
}

export const LiveCanvasOverlay: FC<ILiveCanvasOverlayProps> = ({ pointerElementRef }) => {
    const { commonWidth, commonHeight } = useAppContext();
    const canvasRef = useRef<HTMLDivElement>(null);
    const [inkingActive, setInkingActive] = useState(false);
    const { inkingManager } = useLiveCanvas(
        "live-canvas", // uniqueKey
        canvasRef, // pointer to div element that we want to host <canvas> element within
        true, // we hardcode inking to always active so we can see cursors
        undefined, // inkingTool. We ignore it in this sample because we set it directly through the inkingManager instead.
        undefined, // lineBrush. We don't change this in this sample.
        undefined, // offset. We don't change this in this sample.
        undefined, // scale. We don't change this in this sample, though it would be a good idea since users can zoom in/out on browser.
        "topLeft", // referencePoint. We always have our app positioned in topLeft corner of screen.
        true, // isCursorShared
    );

    useEffect(() => {
        if (!inkingManager || !pointerElementRef.current) return;
        // While inking is active, we use the default `PointerInputProvider` used in `InkingManager` normally.
        // This will prevent scrolling and clicking on the underlying content, which is expected.
        // When inking is not active, our `NonClickablePointerInputProvider` changes the pointer input element to point to the pointerElement.
        // This is because the `<canvas>` overlay is set to disable pointer events, so that users can still click below it.
        // By using the element that contains the page's content, we can get the cursor positions as the mouse moves while also allowing clicks underneath it.
        // The cursors and strokes from other users will still be rendered inside of the <canvas> element.
        const inputProvider = inkingActive
            ? new PointerInputProvider(
                  canvasRef!.current!.getElementsByTagName("canvas")[0]
              )
            : new NonClickablePointerInputProvider(pointerElementRef.current);
        inputProvider.activate();
        inkingManager.inputProvider = inputProvider;
        return () => {
            inputProvider.deactivate();
        };
    }, [inkingManager, pointerElementRef, inkingActive]);

    return (
        <>
            <div
                ref={canvasRef}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: `${commonHeight}px`,
                    width: `${commonWidth}px`,
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
