import { FC, ReactNode } from "react";
import { FlexColumn, FlexRow } from "../flex";
import { tokens } from "@fluentui/react-theme";
import { useAppContext } from "../../../context";
import { Button, Subtitle2 } from "@fluentui/react-components";
import { DismissCircle24Filled } from "@fluentui/react-icons";

interface IModalContainerProps {
    children?: ReactNode;
    dismissRoute: string;
    title?: string;
}

export const ModalContainer: FC<IModalContainerProps> = ({
    children,
    dismissRoute,
    title,
}) => {
    const { width, height, navigate } = useAppContext();
    const onDismiss = () => {
        navigate(dismissRoute);
    };
    return (
        <FlexColumn
            onClick={onDismiss}
            style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                position: "fixed",
                zIndex: 1,
                left: 0,
                right: 0,
                width: `${width}px`,
                height: `${height}px`,
            }}
            vAlign="center"
            hAlign="center"
        >
            <FlexColumn
                style={{
                    padding: "24px",
                    backgroundColor: tokens.colorNeutralBackground1,
                    borderRadius: "8px",
                }}
                onClick={(ev) => {
                    ev.stopPropagation();
                }}
            >
                <FlexRow vAlign="center" hAlign="end" spaceBetween gap="large">
                    {title && <Subtitle2>{title}</Subtitle2>}
                    <Button
                        icon={<DismissCircle24Filled />}
                        title="Dismiss"
                        onClick={onDismiss}
                        appearance="subtle"
                    />
                </FlexRow>
                {children}
            </FlexColumn>
        </FlexColumn>
    );
};
