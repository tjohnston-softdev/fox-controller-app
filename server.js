/*
	FOX Controller API file.
	Created with Express Generator
*/

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorHtml = require("./fox-api/error-html");

var indexRouter = require('./routes/index');
var adminRouter = require("./routes/admin");
var alarmRouter = require("./routes/alarm");
var storageRouter = require("./routes/storage");
var deviceRouter = require("./routes/devices");
var nodesRouter = require("./routes/nodes");

var app = express();


// Initialize.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Define endpoint folders.
app.use('/', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/alarm-history', alarmRouter);
app.use('/api/storage', storageRouter);
app.use('/api/devices', deviceRouter);
app.use('/api/nodes', nodesRouter);



// Handle endpoint error.
app.use(function (errorObject, req, res, next)
{
	var outputHTML = "";
	
	// Set error response.
	res.locals.message = errorObject.message;
	res.locals.error = errorObject;
	res.status(errorObject.status);
	
	
	// Write and send error HTML.
	outputHTML = errorHtml.writeHTML(errorObject.message, errorObject.status);
	res.send(outputHTML);
});

module.exports = app;
