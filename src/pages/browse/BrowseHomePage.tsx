import { FC } from "react";
import { FlexColumn, FlexRow, HeroBanner } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Body1 } from "@fluentui/react-components";
import { HOME_PAGE_BODY_1, HOME_PAGE_BODY_2 } from "../../constants";
import { LiveVideo } from "../../components/live-browser";

const VIDEO_URL =
    "https://storage.googleapis.com/media-session/big-buck-bunny/trailer.mov";

export const BrowseHomePage: FC = () => {
    return (
        <FlexRow fill="both" hAlign="center">
            <LiveScrollView
                uniqueKey="test-home-2"
                fill="both"
                style={{
                    paddingTop: "12px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingBottom: "24px",
                }}
            >
                <HeroBanner
                    title={"Welcome to the Live Share + ACS CoBrowse demo!"}
                    subtitle={"Where dreams come true"}
                />
                <Body1
                    style={{
                        whiteSpace: "pre-wrap",
                        width: "100%",
                        marginBottom: "24px",
                    }}
                >
                    {HOME_PAGE_BODY_1}
                </Body1>
                <LiveVideo videoUrl={VIDEO_URL} />
                <Body1
                    style={{
                        whiteSpace: "pre-wrap",
                        width: "100%",
                        marginBottom: "24px",
                    }}
                >
                    {HOME_PAGE_BODY_2}
                </Body1>
            </LiveScrollView>
        </FlexRow>
    );
};
