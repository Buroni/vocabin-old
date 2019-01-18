const Treetagger = require('../treetagger');
const Sequelize = require('sequelize');
const posFilters = require('../posFilters');

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
     const vocab = [];
      console.log(results);
      const filtered = [...new Set(results
       .filter(r => posFilters(language, r.pos))
       .map(r => {
         if (r.l !== '<unknown>' && r.l !== '_' && typeof r.l !== 'undefined') {
           return r.l;
         } else {
           return r.t;
        }
       }))];


      if (filtered.length === 0) {
        res.json({});
      }

        filtered.forEach(async word => {
        const query = `SELECT freq FROM word_freq_${getLanguage(language)} WHERE word=$1`;
        let queryResults;
        try {
          queryResults = await sequelize.query(query, {bind: [word]});
        } catch(err) {
          console.error(err);
        }

        googleTranslate.translate(word, 'en', (err, translation) => {
          const freq = (queryResults[0][0]) ? +queryResults[0][0].freq : 0;
          vocab.push({ word, translation: translation.translatedText, occurrence: getDifficulty(freq), checked: true});
          if (vocab.length === filtered.length) {
            res.json(vocab.filter(v => v.word !== '<unknown>'));
          }
        });

      });

    });
  });
};

function getDifficulty(freq) {
  let occurrence;
  if (freq >= 1000) {
    occurrence = 'Very common';
  }
  else if (freq > 100) {
    occurrence = 'Common';
  }
  else if (freq > 1) {
    occurrence = 'Uncommon';
  }
  else {
    occurrence = 'Very uncommon';
  }
  return occurrence;
}

function getLanguage(lang) {
  const langs = ['chinese', 'german', 'french', 'korean', 'spanish', 'italian', 'russian'];
  if (!langs.includes(lang)) {
    return null;
  } else {
    return lang;
  }
}
