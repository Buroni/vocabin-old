const Treetagger = require('../treetagger');
const Sequelize = require('sequelize');
const constants = require("../constants");
const utils = require("../utils");
const env = process.env.NODE_ENV || 'dev';
const config = require(`../../config/${env}.json`);

const sequelize = new Sequelize(
    config.mysqlCredentials.database,
    config.mysqlCredentials.username,
    config.mysqlCredentials.password,
    constants.SEQUELIZE_OPTIONS
);

sequelize
    .authenticate()
    .then(() => {
        console.log('MySQL connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = function(app) {

    const origin = (env === 'dev') ? constants.LOCAL_ORIGIN_URL : constants.REMOTE_ORIGIN_URL;
    const route = "/api/pos";

    app.options(route, function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader('Access-Control-Allow-Methods', origin);
        res.setHeader("Access-Control-Allow-Headers", origin);
        res.end();
    });

    app.post(route, async (req, res) => {
        const language = req.body.language;
        const text = req.body.text;
        const tagger = new Treetagger({language});
        const sentences = text.split(".");

        const promises = sentences.map(async (sentence) => {
            const results = await asyncTag(sentence, tagger);
            const filtered = await utils.filterResults(results, language, req.body.cardType);
            const translationItem = await getFilteredResults(filtered, language, sentence);
            return translationItem;
        });

        Promise.all(promises).then(items => {
            res.json(items.flat());
        });
    });
};

const asyncTag = (text, tagger) => {
    return new Promise((resolve, reject) => {
        tagger.tag(text, (err, results) => {
            return resolve(results);
        });
    });
};

const getFilteredResults = (filtered, language, sentence) => {
    const query = `SELECT relative_freq AS freq FROM word_freq_${utils.getLanguage(language)} WHERE word=$1`;

    const promises = filtered.map(async (word, idx) => {
        const queryResults = await sequelize.query(query, {bind: [word]});
        const freq = (queryResults[0][0]) ? +queryResults[0][0].freq : 0;
        const translation = await utils.asyncTranslate(word);
        return {
            word,
            sentence,
            translation: translation.translatedText,
            occurrence: getDifficulty(freq, language),
            checked: true,
            id: idx,
        };
    });

    return Promise.all(promises);
};

const getDifficulty = (freq, language) => {
    let occurrence;
    const thresholds = constants.OCCURRENCE_THRESHOLDS[language];
    if (freq >= thresholds.top5) {
        occurrence = 'Very common';
    }
    else if (freq > thresholds.top10) {
        occurrence = 'Common';
    }
    else if (freq > thresholds.top50) {
        occurrence = 'Uncommon';
    }
    else {
        occurrence = 'Very uncommon';
    }
    return occurrence;
};
