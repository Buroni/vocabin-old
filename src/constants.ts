import {CardType, Language, TranslationRequest} from "./appTypes";

export const INITIAL_TRANSLATION_REQUEST: TranslationRequest = {
    language: Language.FRENCH,
    cardType: CardType.BASIC,
    text: null
};

export const CHAR_LIMIT = 2000;
