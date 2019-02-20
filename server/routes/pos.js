const Treetagger = require('../treetagger');
const Sequelize = require('sequelize');
const posFilters = require('../posFilters');
const nonWordFilters = require('../nonWordFilter');

const env = process.env.NODE_ENV || 'dev';
const config = require(`../../config/${env}.json`);

const googleTranslate = require('google-translate')(config.googleTranslateApiKey);

const sequelize = new Sequelize(config.mysqlCredentials.database, config.mysqlCredentials.username, config.mysqlCredentials.password, {
  host: config.mysqlCredentials.host,
  dialect: "mysql",
  port: 3306,
  define: {
    paranoid: true
  }
});

sequelize
    .authenticate()
    .then(() => {
      console.log('Postgres connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

module.exports = function(app) {

  const origin = (env === 'dev') ? 'http://localhost:4200' : 'http://vocabin.net';

  app.options('/api/pos', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader('Access-Control-Allow-Methods', origin);
    res.setHeader("Access-Control-Allow-Headers", origin);
    res.end();
  });

  app.post('/api/pos', (req, res) => {
    const language = req.body.language;
    const text = req.body.text;
    const tagger = new Treetagger({language: language});

   tagger.tag(text, async function (err, results) {
      const filtered = await filterResults(results, language, req.body.cardType);

      if (filtered.length === 0) {
        res.json({});
      }

      sendFilteredResults(filtered, language, res);
    });
  });
};

async function filterResults(results, language, cardType) {
  const words = [...new Set(results
    .filter(r => posFilters(language, r.pos))
    .map(r => {
      console.log(r.t);
      console.log(r.pos);
      if (r.l !== '<unknown>' && r.l !== '_' && typeof r.l !== 'undefined' && !cardType.includes('cloze')) {
        return r.l;
      } else {
        return r.t;
      }
    })
  )];

  const legalWords = await filterIllegalWords(words);
  return legalWords;
}

function sendFilteredResults(filtered, language, res) {
  const vocab = [];
  filtered.forEach(async word => {
    const query = `SELECT relative_freq AS freq FROM word_freq_${getLanguage(language)} WHERE word=$1`;
    let queryResults;

    try {
      queryResults = await sequelize.query(query, {bind: [word]});

      googleTranslate.translate(word, 'en', (err, translation) => {
        const freq = (queryResults[0][0]) ? +queryResults[0][0].freq : 0;

        vocab.push({ word, translation: translation.translatedText, occurrence: getDifficulty(freq), checked: true});

        if (vocab.length === filtered.length) {
          res.json(vocab.filter(v => v.word !== '<unknown>'));
        }
      });

    } catch(err) {
      console.error(err);
    }
  });
}

function getDifficulty(freq) {
  let occurrence;
  if (freq >= 0.000075762) {
    occurrence = 'Very common';
  }
  else if (freq > 0.000007331) {
    occurrence = 'Common';
  }
  else if (freq > 0.000000244) {
    occurrence = 'Uncommon';
  }
  else {
    occurrence = 'Very uncommon';
  }
  return occurrence;
}

function getLanguage(lang) {
  if (lang === 'portuguese-finegrained') return 'portuguese';
  const langs = ['chinese', 'german', 'french', 'korean', 'spanish', 'italian', 'russian', 'danish', 'portuguese-finegrained', 'swahili'];
  if (!langs.includes(lang)) {
    return null;
  } else {
    return lang;
  }
}

async function filterIllegalWords(words) {
  const promises = words.map(word => nonWordFilters(word));
  const results = await Promise.all(promises);
  return words.filter((word, i) => results[i]);
}
