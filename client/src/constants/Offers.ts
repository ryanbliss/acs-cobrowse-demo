import { IOffer } from "../interfaces";

const OFFER_1: IOffer = {
    id: "checking-625",
    type: "CHECKING",
    amount: 625,
    expiresFormattedDate: "August 27, 2023",
    steps: [
        {
            title: "Open an account",
            body: "Open an eligible checking account at Contoso Bank with a minimum opening deposit of $100 by August 27, 2023.",
        },
        {
            title: "Maintain minimum balance",
            body: "Maintain an average checking balance of $25,000 or more for your first three months.",
        },
        {
            title: "Wait for 30 days",
            body: "Within 30 days of qualification, you will receive an automatic deposit of $625. Enjoy!",
        },
    ],
}

export const OFFERS: IOffer[] = [
    OFFER_1,
];
