import { FC } from "react";
import { FlexRow } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Body1, Title1 } from "@fluentui/react-components";
import { fillArray } from "../../utils";

const LEFT_NUMBERS = fillArray(100).map((num) => `Left ${num}`);
const RIGHT_NUMBERS = fillArray(100).map((num) => `Right ${num}`);

export const BrowseHomePage: FC = () => {
    return (
        <FlexRow fill="both" hAlign="center">
            <LiveScrollView
                uniqueKey="test-home"
                style={{
                    width: "320px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                }}
            >
                <Title1>{"Home Left"}</Title1>
                {LEFT_NUMBERS.map((number) => (
                    <Body1 key={number}>{number}</Body1>
                ))}
            </LiveScrollView>
            <LiveScrollView
                uniqueKey="test-home-2"
                fill="both"
                style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                }}
            >
                <Title1>{"Home Right"}</Title1>
                {RIGHT_NUMBERS.map((number) => (
                    <Body1 key={number}>{number}</Body1>
                ))}
            </LiveScrollView>
        </FlexRow>
    );
};
