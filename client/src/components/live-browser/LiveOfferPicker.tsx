import { FC } from "react";
import { IOffer } from "../../interfaces";
import { FlexColumn, FlexItem, FlexRow } from "../common";
import { OFFERS } from "../../constants/Offers";
import { Button, Card, Title3 } from "@fluentui/react-components";

interface ILiveOfferPickerProps {
    buttonText: string;
    selectedOffer: IOffer | undefined;
    onSelectOffer: (offer: IOffer) => void;
}

export const LiveOfferPicker: FC<ILiveOfferPickerProps> = ({
    buttonText,
    selectedOffer,
    onSelectOffer,
}) => {
    return (
        <FlexColumn fill="both" scroll>
            <FlexItem noShrink>
                <FlexColumn fill="both" gap="small">
                    {OFFERS.map((offer) => (
                        <Card key={offer.id}>
                            <FlexColumn gap="small">
                                <Title3>
                                    {offer.type + ` $${offer.amount}.00`}
                                </Title3>
                                <FlexRow>
                                    <Button
                                        disabled={
                                            selectedOffer?.id === offer.id
                                        }
                                        onClick={() => {
                                            onSelectOffer(offer);
                                        }}
                                    >
                                        {buttonText}
                                    </Button>
                                </FlexRow>
                            </FlexColumn>
                        </Card>
                    ))}
                </FlexColumn>
            </FlexItem>
        </FlexColumn>
    );
};
