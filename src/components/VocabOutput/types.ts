export enum Occurrence {
    VERY_UNCOMMON = "Very uncommon",
    UNCOMMON = "Uncommon",
    COMMON = "Common",
    VERY_COMMON = "Very common"
}

export type TranslationResponseItem = {
    word: string;
    sentence: string;
    translation: string;
    occurrence: Occurrence;
    checked: boolean;
    id: number;
};

export type WordGroups = {
    veryCommon: TranslationResponseItem[];
    common: TranslationResponseItem[];
    uncommon: TranslationResponseItem[];
    veryUncommon: TranslationResponseItem[];
};
