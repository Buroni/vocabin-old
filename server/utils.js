const posFilters = require("./posFilters");
const nonWordFilters = require("./nonWordFilter");
const env = process.env.NODE_ENV || "dev";
const config = require(`../config/${env}.json`);
const googleTranslate = require("google-translate")(
    config.googleTranslateApiKey
);

const rootWordExists = word =>
    word !== "<unknown>" && word !== "_" && typeof word !== "undefined";

async function filterIllegalWords(words) {
    const promises = words.map(word => nonWordFilters(word));
    const results = await Promise.all(promises);
    return words.filter((word, i) => results[i]);
}

async function filterResults(results, language, cardType, options) {
    const words = [
        ...new Set(
            results
                .filter(r => posFilters(language, r.pos))
                .map(r => {
                    //r.t: original word; r.l root form.
                    if (
                        rootWordExists(r.l) &&
                        options.convertToRoot &&
                        !cardType.includes("cloze")
                    ) {
                        return r.l;
                    } else {
                        return r.t;
                    }
                })
        )
    ];

    try {
        const legalWords = await filterIllegalWords(words);
        return legalWords;
    } catch (e) {
        console.log(e);
    }
}

function getLanguage(lang) {
    if (lang === "portuguese-finegrained") return "portuguese";
    const langs = [
        "chinese",
        "german",
        "french",
        "korean",
        "spanish",
        "italian",
        "russian",
        "danish",
        "portuguese-finegrained",
        "swahili"
    ];
    if (!langs.includes(lang)) {
        return null;
    } else {
        return lang;
    }
}

const extractFromSpan = translation => {
    const matchSpan = str =>
        str
            .match(/<span>(.*?)<\/span>/g)
            .map(v => v.replace(/<\/?span>/g, ""))[0];
    return {
        originalText: matchSpan(translation.originalText),
        translatedText: matchSpan(translation.translatedText)
    };
};

/*
 * We wrap the target word in <span>...</span> tags and translate the whole sentence, in order to translate the word
 * contextually. Then the correct word in the translated sentence can be extracted from the span tags.
 */
const asyncTranslate = (word, sentence, langIso, contextual = false) => {
    const target = contextual
        ? sentence
              .replace(word, `<span>${word}</span>`)
              .split(",")
              .find(clause => clause.includes("span"))
        : word;

    return new Promise((resolve, reject) => {
        googleTranslate.translate(target, langIso, "en", (err, translation) => {
            return err
                ? reject(err)
                : resolve(
                      contextual ? extractFromSpan(translation) : translation
                  );
        });
    });
};

module.exports = {
    filterResults,
    getLanguage,
    asyncTranslate
};
