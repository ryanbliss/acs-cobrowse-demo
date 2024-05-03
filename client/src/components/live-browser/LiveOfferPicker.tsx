import { FC } from "react";
import { IOffer } from "../../interfaces";
import { FlexColumn, FlexItem, FlexRow } from "../common";
import { OFFERS } from "../../constants/Offers";
import { Button, Card, Text, Title2, Title3 } from "@fluentui/react-components";
import { useMeetingDetails } from "../../hooks/useMeetingDetails";
import { copyToClipboard } from "../../utils";

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
    const meetingDetails = useMeetingDetails();
    return (
        <FlexColumn fill="both" scroll>
            <FlexItem noShrink>
                <FlexColumn fill="both" gap="small">
                    <FlexColumn gap="small">
                        <Title2>{"Meeting Join URL"}</Title2>
                        <Text>{meetingDetails?.details?.joinUrl}</Text>
                        <FlexRow>
                            <Button
                                onClick={async () => {
                                    copyToClipboard(meetingDetails?.details?.joinUrl ?? "");
                                }}
                            >
                                {"Copy to clipboard"}
                            </Button>
                        </FlexRow>
                    </FlexColumn>
                    <Title2>{"Offers"}</Title2>
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
