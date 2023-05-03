import { FC } from "react";
import { FlexColumn, FlexItem, FlexRow } from "../common";
import {
    Body1,
    Button,
    Subtitle1,
    Subtitle2Stronger,
    Title1,
    Title2,
    tokens,
} from "@fluentui/react-components";
import { ContentBlockWrapper } from "./ContentBlockWrapper";
import { IOffer } from "../../interfaces";

interface IHeroOfferProps {
    offer: IOffer
    copyTitle: string;
    copyBody: string;
    ctaText: string;
    onClickCTA: () => void;
}

export const HeroOffer: FC<IHeroOfferProps> = ({
    offer,
    copyTitle,
    copyBody,
    ctaText,
    onClickCTA,
}) => {
    const appliedCopyTitle = copyTitle
        .replace(":offer-amount:", `$${offer.amount}`)
        .replace(":offer-type:", offer.type.toLocaleLowerCase())
        .replace(":steps-count:", `${offer.steps.length}`);
    const appliedCopyBody = copyBody
        .replace(":offer-amount:", `$${offer.amount}`)
        .replace(":offer-type:", offer.type.toLocaleLowerCase())
        .replace(":steps-count:", `${offer.steps.length}`);
    return (
        <ContentBlockWrapper>
            <FlexRow gap="large">
                <FlexItem noShrink>
                    <FlexColumn gap="smaller">
                        <Subtitle2Stronger>{"Earn a"}</Subtitle2Stronger>
                        <Title1
                            style={{
                                fontSize: "80px",
                                lineHeight: "100px",
                                color: tokens.colorBrandForeground1,
                                fontWeight: 800,
                            }}
                        >{`$${offer.amount}`}</Title1>
                        <Subtitle1>{offer.type.toUpperCase() + " BONUS"}</Subtitle1>
                    </FlexColumn>
                </FlexItem>
                <FlexColumn gap="small">
                    <Title2>{appliedCopyTitle}</Title2>
                    <Body1>{appliedCopyBody}</Body1>
                    <FlexRow>
                        <Button appearance="primary" onClick={onClickCTA}>
                            {ctaText}
                        </Button>
                    </FlexRow>
                </FlexColumn>
            </FlexRow>
        </ContentBlockWrapper>
    );
};
