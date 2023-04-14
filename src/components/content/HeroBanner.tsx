import { FC } from "react";
import { FlexColumn } from "../flex";
import { tokens } from "@fluentui/react-theme";
import { Subtitle2, Title1 } from "@fluentui/react-components";

interface IHeroBannerProps {
    title: string;
    subtitle: string;
}
export const HeroBanner: FC<IHeroBannerProps> = ({ title, subtitle }) => {
    return (
        <FlexColumn
            style={{
                padding: "24px",
                backgroundColor: tokens.colorBrandBackground,
                borderRadius: "4px",
            }}
        >
            <Title1
                style={{
                    color: tokens.colorNeutralForegroundOnBrand,
                }}
            >
                {title}
            </Title1>
            <Subtitle2
                style={{
                    color: tokens.colorNeutralForegroundOnBrand,
                }}
            >
                {subtitle}
            </Subtitle2>
        </FlexColumn>
    );
};
