import { CSSProperties, FC, ReactNode } from "react";
import { FlexColumn } from "../common";

interface IContentBlockWrapperProps {
    children?: ReactNode;
    style?: CSSProperties;
}

export const ContentBlockWrapper: FC<IContentBlockWrapperProps> = ({ children, style }) => {
    return (
        <FlexColumn
            hAlign="center"
            vAlign="end"
            style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                paddingLeft: "24px",
                paddingRight: "24px",
                ...style,
            }}
        >
            <FlexColumn
                style={{
                    maxWidth: "620px",
                }}
                vAlign="end"
            >
                {children}
            </FlexColumn>
        </FlexColumn>
    );
};
