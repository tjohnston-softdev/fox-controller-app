var express = require('express');
var alarmParams = require("../fox-api/alarm-params");
var alarmDatabase = require("../fox-api/alarm-database");
var router = express.Router();

router.get('/', function(req, res, next)
{
	res.send("Alarm root");
});


router.get('/list/:nodeId', function(req, res, next)
{
	var currentTime = Date.now();
	var paraObject = {};
	var resultArray = [];
	
	paraObject["nodeID"] = alarmParams.readNodeID(req.params.nodeId);
	paraObject["timeLower"]	= alarmParams.readNumber(req.query.from, 0);
	paraObject["timeUpper"] = alarmParams.readNumber(req.query.to, currentTime);
	paraObject["limit"] = alarmParams.readLimit(req.query.limit, 100);
	alarmParams.swapTimestamps(paraObject);
	
	resultArray = alarmDatabase.getAlarms(paraObject);
	
	res.send(resultArray);
});


router.get('/available', function(req, res, next)
{
	var resultArray = alarmDatabase.getAvailable();
	res.send(resultArray);
});

module.exports = router;