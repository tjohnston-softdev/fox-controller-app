var express = require('express');
var bodyParser = require("body-parser");
var httpErrors = require("http-errors");
var rioIndex = require('../fox-devices/remote_io/remote-io.index');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));


router.get('/', function(req, res, next)
{
	res.send("Nodes root");
});


router.get('/:maker', function(req, res, next)
{
	res.send("List Nodes by Manufacturer");
});


router.get('/:maker/:deviceId', function(req, res, next)
{
	res.send("Get Specific Node");
});


module.exports = router;