import { IOffer } from "../interfaces";
import VIDEO_PATH_C625 from "../assets/contoso-bank-checking-625.webm";
import VIDEO_PATH_S1000 from "../assets/contoso-bank-saving-1000.webm";
const VIDEO_URL_C625 = window.location.origin + VIDEO_PATH_C625;
const VIDEO_URL_S1000 = window.location.origin + VIDEO_PATH_S1000;

const OFFER_1: IOffer = {
    id: "checking-625",
    type: "CHECKING",
    amount: 625,
    expiresFormattedDate: "August 27, 2023",
    videoUrl: VIDEO_URL_C625,
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

const OFFER_2: IOffer = {
    id: "savings-1000",
    type: "SAVINGS",
    amount: 1000,
    expiresFormattedDate: "August 27, 2023",
    videoUrl: VIDEO_URL_S1000,
    steps: [
        {
            title: "Open an account",
            body: "Open an eligible savings account at Contoso Bank with a minimum opening deposit of $100 by August 27, 2023.",
        },
        {
            title: "Maintain minimum balance",
            body: "Maintain an average savings balance of $100,000 or more for your first three months.",
        },
        {
            title: "Wait for 30 days",
            body: "Within 30 days of qualification, you will receive an automatic deposit of $1000. Enjoy!",
        },
    ],
}

export const OFFERS: IOffer[] = [
    OFFER_1,
    OFFER_2,
];
