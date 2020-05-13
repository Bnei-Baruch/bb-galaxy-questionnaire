#!/usr/bin/env node
/** server.js  */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 2200;
const socketUtils = require('./server/socketUtils');
const cors = require('cors')

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.resolve('build')));
app.use('/public', express.static(path.resolve('public')));

require('./server/use').use(app);
const server = app.listen(port, ()=>{
    console.log('BB Questionnaire server up on port', port);
    socketUtils.setSocket(server);
});