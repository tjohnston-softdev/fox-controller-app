var express = require('express');
var dhcpGenerator = require("../fox-api/dhcp-generator");
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



module.exports = router;