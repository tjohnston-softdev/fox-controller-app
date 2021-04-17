var express = require('express');
var alarmParams = require("../fox-api/alarm-params");
var router = express.Router();

router.get('/', function(req, res, next)
{
	res.send("Alarm root");
});


router.get('//list/:nodeId', function(req, res, next)
{
	// Todo
	
	var currentTime = Date.now();
	var paraObject = {};
	
	paraObject["nodeID"] = alarmParams.readNodeID(req.params.nodeId);
	paraObject["timeLower"]	= alarmParams.readNumber(req.query.from, 0);
	paraObject["timeUpper"] = alarmParams.readNumber(req.query.to, currentTime);
	paraObject["limit"] = alarmParams.readLimit(req.query.limit, 100);
	alarmParams.swapTimestamps(paraObject);
	
	res.send(paraObject);
});


router.get('/available', function(req, res, next)
{
	// Todo
	res.send("Available");
});