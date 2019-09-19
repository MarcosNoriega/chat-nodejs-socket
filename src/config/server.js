const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.set('port', process.env.PORT || 3000);

//database
require('../db');


//middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


module.exports = app;