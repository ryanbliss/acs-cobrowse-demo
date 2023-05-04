import { FC, useCallback } from "react";
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
    Text,
    Title1,
} from "@fluentui/react-components";
import { OFFER_SIGN_UP_TITLE } from "../../constants";
import { LiveAccordion, LiveTextInput } from "../../components/live-browser";
import { useLiveBrowserContext } from "../../context";
import { LiveDropdownMenu } from "../../components/live-browser/LiveDropdownMenu";
import { fillArray } from "../../utils";
import { BuildingBankRegular, LockClosedRegular, MailRegular, PersonRegular, PhoneRegular } from "@fluentui/react-icons";

const LOCAL_BRANCH_OPTIONS = fillArray(10).map((number) => ({
    id: `branch-${number}`,
    displayText: `Washington branch #${number}`,
}));

export const BrowseOfferSignUpPage: FC = () => {
    const { navigate, routePrefix, offer } = useLiveBrowserContext();

    const onClickSubmit = useCallback(() => {
        navigate(routePrefix + "/offer-thank-you");
    }, [navigate, routePrefix, offer]);

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
                            uniqueKey={`offer-sign-up/${offer.id}`}
                            initialOpenItem="Basic information"
                        >
                            <AccordionItem value={"Basic information"}>
                                <AccordionHeader>
                                    {"Basic information"}
                                </AccordionHeader>
                                <AccordionPanel
                                    style={{
                                        paddingBottom: "12px",
                                    }}
                                >
                                    <FlexColumn gap="smaller">
                                        <LiveTextInput
                                            uniqueKey={`sign-up/first-name`}
                                            label="First name"
                                            placeholder="Enter a first name"
                                            contentBefore={<PersonRegular />}
                                        />
                                        <LiveTextInput
                                            uniqueKey={`sign-up/last-name`}
                                            label="Last name"
                                            placeholder="Enter a last name"
                                            contentBefore={<PersonRegular />}
                                        />
                                        <LiveTextInput
                                            uniqueKey={`sign-up/email`}
                                            label="Email"
                                            placeholder="Enter an email"
                                            type="email"
                                            contentBefore={<MailRegular />}
                                        />
                                        <LiveTextInput
                                            uniqueKey={`sign-up/phone`}
                                            label="Phone number"
                                            placeholder="Enter an phone number"
                                            type="tel"
                                            contentBefore={<PhoneRegular />}
                                        />
                                        <LiveDropdownMenu
                                            uniqueKey="sign-up/local-branch"
                                            options={LOCAL_BRANCH_OPTIONS}
                                            label={"Local branch"}
                                            placeholder="Select a local branch"
                                        />
                                        <TextInput
                                            id={`sign-up/ssn`}
                                            label="Social security number (only you will see this)"
                                            placeholder="Enter your SSN"
                                            contentBefore={<LockClosedRegular />}
                                        />
                                        <TextInput
                                            id={`sign-up/password`}
                                            label="Password (only you will see this)"
                                            placeholder="Enter an password"
                                            type="password"
                                            contentBefore={<LockClosedRegular />}
                                        />
                                    </FlexColumn>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem value={"Financial history"}>
                                <AccordionHeader>
                                    {"Financial information"}
                                </AccordionHeader>
                                <AccordionPanel
                                    style={{
                                        paddingBottom: "24px",
                                    }}
                                >
                                    <FlexColumn gap="smaller">
                                        <LiveTextInput
                                            uniqueKey="sign-up/salary"
                                            label="Annual salary"
                                            placeholder="Enter your annual salary"
                                            type="number"
                                            contentBefore={
                                                <Text size={400}>$</Text>
                                            }
                                        />
                                        <LiveTextInput
                                            uniqueKey="sign-up/current-bank"
                                            label="Current bank"
                                            placeholder="Enter your current bank name"
                                            contentBefore={<BuildingBankRegular />}
                                        />
                                    </FlexColumn>
                                </AccordionPanel>
                            </AccordionItem>
                        </LiveAccordion>
                        <Button appearance="primary" onClick={onClickSubmit}>
                            {"Submit"}
                        </Button>
                    </FlexColumn>
                </ContentBlockWrapper>
            </LiveScrollView>
        </FlexRow>
    );
};
