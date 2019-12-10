import {
    Occurrence,
    TranslationResponseItem,
    WordGroups
} from "./components/VocabOutput/types";

export const organiseVocab = (
    translationResponse: TranslationResponseItem[]
) => {
    const organised: WordGroups = {
        veryCommon: [],
        common: [],
        uncommon: [],
        veryUncommon: []
    };
    translationResponse.forEach(item => {
        switch (item.occurrence) {
            case Occurrence.VERY_COMMON:
                organised.veryCommon.push(item);
                break;
            case Occurrence.COMMON:
                organised.common.push(item);
                break;
            case Occurrence.UNCOMMON:
                organised.uncommon.push(item);
                break;
            case Occurrence.VERY_UNCOMMON:
                organised.veryUncommon.push(item);
                break;
        }
    });
    return organised;
};
