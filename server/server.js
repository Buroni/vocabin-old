const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const https = require('https');
const http = require('http');
const constants = require("./constants");

const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(constants.CORS_OPTIONS));
app.set('port', port);

require('./routes')(app, {});

if (env === "dev") {
  http.createServer(app).listen(port);
} else {
  https.createServer(constants.SSL_OPTIONS, app).listen(port);
}
