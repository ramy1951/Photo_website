var express = require('express');
var session = require('express-session')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');
var mysql = require('mysql');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var controllers = require('./Controllers/controller');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //let us grab entry using body variable
app.use(cookieParser()); //cookies allow sessions
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Controller', controllers); //all the getting and posting is being done in the controller.js


module.exports = app;
