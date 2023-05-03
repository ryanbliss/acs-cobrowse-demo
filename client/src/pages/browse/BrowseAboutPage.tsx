import { FC } from "react";
import { FlexRow, HeroBanner } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Body1 } from "@fluentui/react-components";
import { ABOUT_PAGE_BODY_1 } from "../../constants";

export const BrowseAboutPage: FC = () => {
    return (
        <FlexRow fill="both">
            <LiveScrollView
                uniqueKey="test-about"
                style={{
                    width: "100%",
                    paddingTop: "12px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingBottom: "24px",
                }}
            >
                <HeroBanner
                    title={"About"}
                    subtitle={"Lorem ipsum"}
                />
                <Body1
                    style={{
                        whiteSpace: "pre-wrap",
                        width: "100%",
                        marginBottom: "24px",
                    }}
                >
                    {ABOUT_PAGE_BODY_1}
                </Body1>
            </LiveScrollView>
        </FlexRow>
    );
};
