import { FC } from "react";
import { FlexColumn } from "../common";
import { Body1, Subtitle2, Title1, Title3, tokens } from "@fluentui/react-components";
import { IOffer } from "../../interfaces";
import { ContentBlockWrapper } from "./ContentBlockWrapper";

interface IOfferStepsBlockProps {
    title: string;
    offer: IOffer;
}

export const OfferStepsBlock: FC<IOfferStepsBlockProps> = ({
    title,
    offer,
}) => {
    const appliedTitle = title
        .replace(":offer-amount:", `$${offer.amount}`)
        .replace(":offer-type:", offer.type.toLocaleLowerCase())
        .replace(":steps-count:", `${offer.steps.length}`);
    const appliedSubtitle = `Offer expires on ${offer.expiresFormattedDate}`;
    return (
        <ContentBlockWrapper>
            <FlexColumn gap="small">
                <Title1>{appliedTitle}</Title1>
                <Subtitle2>{appliedSubtitle}</Subtitle2>
                {offer.steps.map((step, index) => (
                    <FlexColumn key={step.title}>
                        <Title3 style={{
                            color: tokens.colorCompoundBrandForeground1,
                        }}>{`${index + 1}. ${step.title}`}</Title3>
                        <Body1>{step.body}</Body1>
                    </FlexColumn>
                ))}
            </FlexColumn>
        </ContentBlockWrapper>
    );
};
