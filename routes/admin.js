var express = require('express');
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



module.exports = router;