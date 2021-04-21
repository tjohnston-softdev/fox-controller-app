var express = require('express');
var httpErrors = require("http-errors");
var dhcpGenerator = require("../fox-api/dhcp-generator");
var serviceMain = require("../service.main");
var router = express.Router();


router.get('/', function(req, res, next)
{
	res.send("Admin root");
});


router.get('/dhcp-clients', function(req, res, next)
{
	var clientArray = dhcpGenerator.generateClients(10);
	res.send(clientArray);
});


router.get('/defaults', function(req, res, next)
{
	var msgObject = {message: "adminApi"};
	res.send(msgObject);
});


router.get('/logs', function(req, res, next)
{
	var logObject = {};
	
	logObject["success"] = true;
	logObject["logs"] = "Lorem Ipsum etc";
	
	res.send(logObject);
});


router.get('/health', function(req, res, next)
{
	serviceMain.controller.getHealth(function (contHealthObj)
	{
		res.send(contHealthObj);
	});
});


router.post('/restart/:unit', function(req, res, next)
{
	var resultObject = {success: true};
	var errorObject = null;
	
	if (req.params.unit === "fox")
	{
		serviceMain.controller.rebootController();
		res.send(resultObject);
	}
	else if (req.params.unit === "process")
	{
		serviceMain.controller.restartProcess();
		res.send(resultObject);
	}
	else
	{
		errorObject = httpErrors(400);
		next(errorObject, "Wrong request!");
	}
});



module.exports = router;