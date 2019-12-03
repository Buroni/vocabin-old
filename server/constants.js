const fs = require('fs');
const env = process.env.NODE_ENV || 'dev';
const config = require(`../config/${env}.json`);

const WHITELIST = ["http://localhost:3000", "https://vocabin.net"];

const OCCURRENCE_THRESHOLDS = {
    "french": {
        "top5": 0.00000018954581752449733,
        "top10": 0.00000006472296208153567,
        "top50": 0.000000004623068720109691
    },
    "italian": {
        "top5": 0.000013700070208293129,
        "top10": 0.0000054800280833172515,
        "top50": 0.0000004566690069431043
    },
    "german": {
        "top5": 0.0000061580041224416486,
        "top10": 0.00000239477938094953,
        "top50": 0.00000034211134013564717
    },
    "spanish": {
        "top5": 0.000007015229483933541,
        "top10": 0.000002598233142197608,
        "top50": 0.00000012991165710988038
    },
    "russian": {
        "top5": 0.00000578766900564648,
        "top10": 0.00000243691326553536,
        "top50": 0.00000015230707909596
    }
};

module.exports = Object.freeze({
    LOCAL_ORIGIN_URL: "http://localhost:3000",
    REMOTE_ORIGIN_URL: "https://vocabin.net",
    SSL_OPTIONS: (env === "dev") ? {} : {
        key: fs.readFileSync(config.sslPrivateKey),
        cert: fs.readFileSync(config.sslCert),
    },
    CORS_OPTIONS: {
        origin: function (origin, callback) {
            if (WHITELIST.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                console.error(`Cross-domain requests blocked for this origin: ${origin}`);
            }
        }
    },
    SEQUELIZE_OPTIONS: {
        host: config.mysqlCredentials.host,
        dialect: "mysql",
        port: 3306,
        define: {
            paranoid: true
        }
    },
    OCCURRENCE_THRESHOLDS
});
