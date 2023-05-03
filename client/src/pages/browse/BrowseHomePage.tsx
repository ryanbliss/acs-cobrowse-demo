import { FC, useCallback } from "react";
import { FlexColumn, FlexRow, OfferStepsBlock } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Body1, Title3, tokens } from "@fluentui/react-components";
import {
    HOME_PAGE_BODY_2,
    HOME_PAGE_OFFER_COPY_BODY,
    HOME_PAGE_OFFER_COPY_TITLE,
    HOME_PAGE_OFFER_STEPS_TITLE,
} from "../../constants";
import { LiveVideo } from "../../components/live-browser";
import { HeroOffer } from "../../components/content/HeroOffer";
import { useAppContext } from "../../context";
import { ContentBlockWrapper } from "../../components/content/ContentBlockWrapper";
import { OFFERS } from "../../constants/Offers";
import VIDEO_PATH from "../../assets/contoso-bank-checking-625.mp4";
const VIDEO_URL = window.location.origin + VIDEO_PATH;

const DEFAULT_OFFER = OFFERS[0];

export const BrowseHomePage: FC = () => {
    const { navigate, routePrefix } = useAppContext();

    const onClickCTA = useCallback(() => {
        navigate(routePrefix + "/offer-sign-up/" + DEFAULT_OFFER.id);
    }, [navigate, routePrefix]);

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
                <HeroOffer
                    offer={DEFAULT_OFFER}
                    copyTitle={HOME_PAGE_OFFER_COPY_TITLE}
                    copyBody={HOME_PAGE_OFFER_COPY_BODY}
                    ctaText={"Sign up"}
                    onClickCTA={onClickCTA}
                />
                <FlexColumn
                    vAlign="center"
                    hAlign="center"
                    style={{
                        paddingTop: "32px",
                        paddingBottom: "32px",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                        backgroundColor: tokens.colorNeutralBackground4,
                    }}
                >
                    <LiveVideo videoUrl={VIDEO_URL} />
                </FlexColumn>
                <OfferStepsBlock
                    offer={DEFAULT_OFFER}
                    title={HOME_PAGE_OFFER_STEPS_TITLE}
                />
                <ContentBlockWrapper style={{
                    backgroundColor: tokens.colorNeutralBackground4,
                }}>
                    <Title3>
                        {"Additional terms & conditions"}
                    </Title3>
                    <Body1
                        style={{
                            whiteSpace: "pre-wrap",
                            width: "100%",
                            marginBottom: "24px",
                        }}
                    >
                        {HOME_PAGE_BODY_2}
                    </Body1>
                </ContentBlockWrapper>
            </LiveScrollView>
        </FlexRow>
    );
};
