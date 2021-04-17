var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require("./routes/admin");
var alarmRouter = require("./routes/alarm");
var storageRouter = require("./routes/storage");
var deviceRouter = require("./routes/devices");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/alarm-history', alarmRouter);
app.use('/api/storage', storageRouter);
app.use('/api/devices', deviceRouter);

module.exports = app;
