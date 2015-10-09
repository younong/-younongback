var express = require('express');
var path = require('path');

// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var app = express();

var apiModule = require('./api/index').init(app);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));


module.exports = app;
