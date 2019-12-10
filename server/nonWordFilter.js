const env = process.env.NODE_ENV || "dev";
const config = require(`../config/${env}.json`);
const googleTranslate = require("google-translate")(
    config.googleTranslateApiKey
);

const illegalChars = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "„",
    "“",
    "[",
    "]",
    "一",
    "«",
    "»"
];

module.exports = function(word) {
    if (illegalChars.includes(word)) {
        return Promise.resolve(false);
    }

    return wordIsLegal(word);
};

function wordIsLegal(word) {
    return new Promise((resolve, reject) => {
        illegalChars.forEach(char => {
            if (word.includes(char)) {
                return resolve(false);
            }
        });

        try {
            googleTranslate.detectLanguage(word, (err, detection) => {
                if (!detection || detection.confidence < 0.2) {
                    return resolve(false);
                }
                return resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
}
