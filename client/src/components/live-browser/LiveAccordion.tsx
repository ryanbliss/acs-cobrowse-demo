import {
    Accordion,
    AccordionToggleEventHandler,
    AccordionProps,
    tokens,
} from "@fluentui/react-components";
import { useCallback, FC, ReactNode } from "react";
import { useLiveState } from "@microsoft/live-share-react";

interface ILiveAccordionProps extends Partial<AccordionProps> {
    uniqueKey: string;
    initialOpenItem?: string;
    children?: ReactNode;
}
export const LiveAccordion: FC<ILiveAccordionProps> = ({ uniqueKey, initialOpenItem, children, }) => {
    const [openItem, setOpenItem] = useLiveState<string | undefined>(uniqueKey, initialOpenItem || "unset");
    const handleToggle = useCallback<AccordionToggleEventHandler>(
        (_, data) => {
            const value = typeof data.value === "string" ? data.value : "unset";
            setOpenItem(value === openItem ? "unset": value);
        },
        [setOpenItem, openItem]
    );
    return (
        <Accordion onToggle={handleToggle} openItems={openItem} style={{
            backgroundColor: tokens.colorNeutralBackground1,
            borderRadius: "8px",
            boxShadow: tokens.shadow2,
        }}>
            {children}
        </Accordion>
    );
};
