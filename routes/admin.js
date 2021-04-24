// '/api/admin' router.

var express = require('express');
var httpErrors = require("http-errors");
var dhcpGenerator = require("../fox-api/dhcp-generator");
var serviceMain = require("../service.main");
var router = express.Router();


// Root
router.get('/', function(req, res, next)
{
	res.send("Admin root");
});


// DHCP Clients.
router.get('/dhcp-clients', function(req, res, next)
{
	var clientArray = dhcpGenerator.generateClients(10);
	res.send(clientArray);
});


// Defaults.
router.get('/defaults', function(req, res, next)
{
	var msgObject = {message: "adminApi"};
	res.send(msgObject);
});


// Logs.
router.get('/logs', function(req, res, next)
{
	var logObject = {};
	
	logObject["success"] = true;
	logObject["logs"] = "Lorem Ipsum etc";
	
	res.send(logObject);
});


// FOX Controller Health
router.get('/health', function(req, res, next)
{
	serviceMain.controller.getHealth(function (contHealthObj)
	{
		res.send(contHealthObj);
	});
});


// Restart Controller.
router.post('/restart/:unit', function(req, res, next)
{
	var resultObject = {success: true};
	var errorObject = null;
	
	if (req.params.unit === "fox")
	{
		// Reboot device.
		serviceMain.controller.rebootController();
		res.send(resultObject);
	}
	else if (req.params.unit === "process")
	{
		// Restart process.
		serviceMain.controller.restartProcess();
		res.send(resultObject);
	}
	else
	{
		// Error.
		errorObject = httpErrors(400);
		next(errorObject, "Wrong request!");
	}
});


// Factory reset.
router.post('/factory-reset', function(req, res, next)
{
	var resultObject = {success: true};
	
	serviceMain.controller.factoryReset(function (resetErr, resetRes)
	{
		res.send(resultObject);
	});
});



module.exports = router;