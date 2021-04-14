var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next)
{
	res.send("Admin root");
});


router.get('/dhcp-clients', function(req, res, next)
{
	// Todo
	res.send("DHCP Clients");
});


router.get('/defaults', function(req, res, next)
{
	var msgObject = {message: "adminApi"};
	res.send(msgObject);
});


router.get('/logs', function(req, res, next)
{
	// Todo
	res.send("Logs");
});



module.exports = router;