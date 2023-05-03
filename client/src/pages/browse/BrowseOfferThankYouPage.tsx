import { FC } from "react";
import { useParams } from "react-router-dom";
import { ContentBlockWrapper, FlexColumn, FlexRow } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Subtitle2, Title1 } from "@fluentui/react-components";

export const BrowseOfferThankYouPage: FC = () => {
    const { offerId } = useParams<{ offerId: string }>();

    return (
        <FlexRow fill="both" hAlign="center">
            <LiveScrollView
                uniqueKey="test-home-2"
                style={{
                    width: "100%",
                    paddingTop: "12px",
                    paddingBottom: "24px",
                }}
            >
                <ContentBlockWrapper>
                    <FlexColumn gap="small">
                        <Title1>{"Thank you for signing up!"}</Title1>
                        <Subtitle2>
                            {
                                "Please work with your banking agent for next steps."
                            }
                        </Subtitle2>
                    </FlexColumn>
                </ContentBlockWrapper>
            </LiveScrollView>
        </FlexRow>
    );
};
