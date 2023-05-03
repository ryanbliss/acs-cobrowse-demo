import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
    ContentBlockWrapper,
    FlexColumn,
    FlexRow,
    TextInput,
} from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import {
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Button,
    Title1,
} from "@fluentui/react-components";
import { OFFER_SIGN_UP_TITLE } from "../../constants";
import { LiveAccordion, LiveTextInput } from "../../components/live-browser";
import { useAppContext } from "../../context";

export const BrowseOfferSignUpPage: FC = () => {
    const { offerId } = useParams<{ offerId: string }>();

    const { navigate, routePrefix } = useAppContext();

    const onClickSubmit = useCallback(() => {
        navigate(routePrefix + "/offer-thank-you/" + offerId);
    }, [navigate, routePrefix, offerId]);

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
                        <Title1>{OFFER_SIGN_UP_TITLE}</Title1>
                        <LiveAccordion
                            uniqueKey={`offer-sign-up/${offerId}`}
                            initialOpenItem="Basic information"
                        >
                            <AccordionItem value={"Basic information"}>
                                <AccordionHeader>
                                    {"Basic information"}
                                </AccordionHeader>
                                <AccordionPanel
                                    style={{
                                        paddingBottom: "24px",
                                    }}
                                >
                                    <FlexColumn gap="smaller">
                                        <LiveTextInput
                                            uniqueKey={`offerId/${offerId}/first-name`}
                                            label="First name"
                                            placeholder="Enter a first name"
                                        />
                                        <LiveTextInput
                                            uniqueKey={`offerId/${offerId}/last-name`}
                                            label="Last name"
                                            placeholder="Enter a last name"
                                        />
                                        <LiveTextInput
                                            uniqueKey={`offerId/${offerId}/email`}
                                            label="Email"
                                            placeholder="Enter an email"
                                            type="email"
                                        />
                                        <LiveTextInput
                                            uniqueKey={`offerId/${offerId}/phone`}
                                            label="Phone number"
                                            placeholder="Enter an phone number"
                                            type="tel"
                                        />
                                        <TextInput
                                            id={`offerId/${offerId}/password`}
                                            label="Password (only you will see this)"
                                            placeholder="Enter an password"
                                            type="password"
                                        />
                                    </FlexColumn>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem value={"Financial history"}>
                                <AccordionHeader>
                                    {"Financial history"}
                                </AccordionHeader>
                                <AccordionPanel
                                    style={{
                                        paddingBottom: "24px",
                                    }}
                                >
                                    <FlexColumn gap="smaller">
                                        <LiveTextInput
                                            uniqueKey={`offerId/${offerId}/salary`}
                                            label="Annual salary"
                                            placeholder="Enter your annual salary"
                                            type="number"
                                        />
                                        <TextInput
                                            id={`offerId/${offerId}/ssn`}
                                            label="Social security number (only you will see this)"
                                            placeholder="Enter your SSN"
                                        />
                                    </FlexColumn>
                                </AccordionPanel>
                            </AccordionItem>
                        </LiveAccordion>
                        <Button
                            appearance="primary"
                            onClick={onClickSubmit}
                        >
                            {"Submit"}
                        </Button>
                    </FlexColumn>
                </ContentBlockWrapper>
            </LiveScrollView>
        </FlexRow>
    );
};
