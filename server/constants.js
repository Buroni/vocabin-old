const fs = require('fs');
const env = process.env.NODE_ENV || 'dev';
const config = require(`../config/${env}.json`);

const WHITELIST = ["http://localhost:3000", "https://vocabin.net"];

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
    }
});
