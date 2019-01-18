const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const whitelist = ['http://localhost:4200', 'http://vocabin.net'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.error('Cross-domain requests blocked for this origin.');
    }
  }
}

app.use(cors(corsOptions));

app.set('port', port);


require('./routes')(app, {});

app.listen(port, () => {
    console.log('Live on ' + port);
});
