import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    AccordionToggleEventHandler,
    Caption1,
} from "@fluentui/react-components";
import { useCallback, FC } from "react";
import { useLiveState } from "@microsoft/live-share-react";

interface ILiveAccordionProps {
    uniqueKey: string;
    items: ILiveAccordionItem[];
}
export const LiveAccordion: FC<ILiveAccordionProps> = ({ uniqueKey, items }) => {
    const [openItem, _, setOpenItems] = useLiveState<string>(uniqueKey, "unset");
    const handleToggle = useCallback<AccordionToggleEventHandler>(
        (_, data) => {
            const value = typeof data.value === "string" ? data.value : "unset";
            setOpenItems(value === openItem ? "unset": value);
        },
        [setOpenItems, openItem]
    );
    return (
        <Accordion onToggle={handleToggle} openItems={openItem}>
            {items.map((item) => (
                <AccordionItem value={item.value} key={item.value}>
                    <AccordionHeader>
                        {item.displayValue}
                    </AccordionHeader>
                    <AccordionPanel>
                        <Caption1>{item.innerText}</Caption1>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export interface ILiveAccordionItem {
    value: string;
    displayValue: string;
    innerText: string;
}
