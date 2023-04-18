import { FC } from "react";
import { FlexRow, HeroBanner } from "../../components";
import { LiveScrollView } from "../../components/live-browser/internals";
import { Body1 } from "@fluentui/react-components";
import { ABOUT_PAGE_BODY_1 } from "../../constants";
import { ILiveAccordionItem, LiveAccordion } from "../../components/live-browser";

const ACCORDION_ITEMS: ILiveAccordionItem[] = [
    {
        value: "item-1",
        displayValue: "Item 1",
        innerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed blandit libero volutpat sed cras. Tristique senectus et netus et. Et odio pellentesque diam volutpat commodo sed egestas. Nisi lacus sed viverra tellus in hac habitasse platea. In dictum non consectetur a erat nam at. Accumsan sit amet nulla facilisi morbi tempus iaculis urna. Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. Sed risus ultricies tristique nulla aliquet enim tortor. Ac ut consequat semper viverra nam libero. Commodo viverra maecenas accumsan lacus vel facilisis. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Id ornare arcu odio ut sem nulla. Nascetur ridiculus mus mauris vitae ultricies leo integer. Feugiat vivamus at augue eget. Quis lectus nulla at volutpat diam ut.",
    },
    {
        value: "item-2",
        displayValue: "Item 2",
        innerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit laoreet id donec ultrices tincidunt arcu non. Maecenas sed enim ut sem viverra aliquet eget sit. Auctor neque vitae tempus quam pellentesque. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Massa vitae tortor condimentum lacinia. Est velit egestas dui id ornare. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Lacus viverra vitae congue eu consequat ac.",
    },
    {
        value: "item-3",
        displayValue: "Item 3",
        innerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris commodo quis imperdiet massa tincidunt nunc. Egestas fringilla phasellus faucibus scelerisque. Vitae sapien pellentesque habitant morbi tristique senectus et netus et. Massa tincidunt dui ut ornare. Commodo nulla facilisi nullam vehicula ipsum a arcu. At varius vel pharetra vel. At auctor urna nunc id cursus. Ornare suspendisse sed nisi lacus sed viverra tellus. Velit laoreet id donec ultrices tincidunt arcu non. Tellus orci ac auctor augue mauris augue neque gravida in. Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Arcu bibendum at varius vel pharetra vel. Eu lobortis elementum nibh tellus molestie nunc. Porttitor lacus luctus accumsan tortor posuere ac ut. Nisl condimentum id venenatis a condimentum. Pellentesque habitant morbi tristique senectus et netus.",
    },
];

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
                <LiveAccordion uniqueKey="about-accordion"
                    items={ACCORDION_ITEMS}
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
