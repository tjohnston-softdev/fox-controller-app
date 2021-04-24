// '/api/nodes' router.

var express = require('express');
var bodyParser = require("body-parser");
var httpErrors = require("http-errors");
var deviceParams = require("../fox-api/device-params");
var rioIndex = require('../fox-devices/remote_io/remote-io.index');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));


// Root
router.get('/', function(req, res, next)
{
	res.send("Nodes root");
});


// Retrieve devices by manufacturer.
router.get('/:maker', function(req, res, next)
{
	rioIndex.listRiosForNode(req.params.maker, function(nodeListErr, nodeListRes)
	{
		if (nodeListErr !== null)
		{
			res.send(nodeListErr);
		}
		else
		{
			res.send(nodeListRes);
		}
	});
});


// Retrieve individual device properties by ID.
router.get('/:maker/:deviceId', function(req, res, next)
{
	var prepMaker = deviceParams.readPage(req.params.maker);
	var prepDeviceID = deviceParams.readPage(req.params.deviceId);
	var resultObject = {};
	var errorObject = null;
	
	if (prepMaker !== null && prepDeviceID !== null)
	{
		// Input valid - Get properties.
		resultObject = rioIndex.getIoProperties(prepDeviceID);
		res.send(resultObject);
	}
	else
	{
		// Input error.
		errorObject = httpErrors(404);
		return next(errorObject)
	}
});


module.exports = router;