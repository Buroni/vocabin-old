import { Occurrence } from "./components/VocabOutput/types";
import { Options } from "./types";

export enum Language {
    SPANISH = "spanish",
    GERMAN = "german",
    RUSSIAN = "russian",
    ITALIAN = "italian",
    FRENCH = "french"
}

export enum CardType {
    BASIC = "basic",
    CLOZE_NO_HINT = "cloze-nohint",
    CLOZE_HINT = "cloze-hint"
}

export type TranslationRequest = {
    language: Language;
    cardType: CardType;
    text: string | null;
    options: Options;
};

export type OccurrenceKey =
    | "veryCommon"
    | "common"
    | "uncommon"
    | "veryUncommon";

export type ToggleGroup = (key: Occurrence, checked: boolean) => void;

export type ToggleItem = (word: string, group: Occurrence) => void;
