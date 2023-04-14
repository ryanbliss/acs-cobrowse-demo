import { FC } from "react";
import { FlexRow } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Subtitle2, Title1 } from "@fluentui/react-components";
import { fillArray } from "../../utils";

const NUMBERS = fillArray(100);

export const BrowseAboutPage: FC = () => {
    return (
        <FlexRow fill="both">
            <LiveScrollView
                uniqueKey="test-about"
                style={{
                    width: "100%",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                }}
            >
                <Title1>{"About"}</Title1>
                {NUMBERS.map((number) => (
                    <Subtitle2 key={number}>{number}</Subtitle2>
                ))}
            </LiveScrollView>
        </FlexRow>
    );
};
