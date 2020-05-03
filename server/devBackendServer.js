const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 2500;
const socketUtils = require('./socketUtils');

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/public', express.static(path.resolve('public')))
require('./use').use(app);

const server = app.listen(port);
socketUtils.setSocket(server);

console.log('BB Questionnaire server is up and running on port ' + port);