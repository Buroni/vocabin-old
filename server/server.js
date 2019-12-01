const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const http = require('http');

const env = process.env.NODE_ENV || 'dev';
const config = require(`../config/${env}.json`);
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = (env === "dev") ? {} : {
	key: fs.readFileSync(config.sslPrivateKey),
    cert: fs.readFileSync(config.sslCert),
};

const whitelist = ['http://localhost:3000', 'https://vocabin.net'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.error(`Cross-domain requests blocked for this origin: ${origin}`);
    }
  }
}

app.use(cors(corsOptions));

app.set('port', port);


require('./routes')(app, {});

http.createServer(app).listen(port);

//https.createServer(options, app).listen(port);
