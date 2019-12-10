import { CardType, Language, TranslationRequest } from "./appTypes";
import { Options } from "./types";

const INITIAL_OPTIONS: Options = {
    contextual: false,
    convertToRoot: false
};

export const INITIAL_TRANSLATION_REQUEST: TranslationRequest = {
    language: Language.FRENCH,
    cardType: CardType.BASIC,
    text: null,
    options: INITIAL_OPTIONS
};

export const CHAR_LIMIT = 2000;
