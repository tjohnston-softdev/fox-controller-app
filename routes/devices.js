var express = require('express');
var deviceSettings = require("../fox-devices/device.settings");
var rioIndex = require('../fox-devices/remote_io/remote-io.index');
var router = express.Router();

var deviceApiUrls =
{
	deviceStatus: '/status/:deviceType/:deviceId',
    defaults: '/defaults',
    deviceType: '/:deviceType',
    deviceQuery: '/:deviceType/:deviceId'
};


router.get('/', function(req, res, next)
{
	res.send("Devices root");
});


router.get(deviceApiUrls.deviceStatus, function(req, res, next)
{
	// Todo
	res.send("Device Status");
});


router.get(deviceApiUrls.defaults, function(req, res, next)
{
	var defaultRes = {};
	
	defaultRes["deviceTypes"] = deviceSettings.deviceTypes;
	defaultRes["rioMakers"] = deviceSettings.listRioMakers;
	defaultRes["rioModelTypes"] = deviceSettings.listRioModelTypes;
	
	res.send(defaultRes);
});


router.get(deviceApiUrls.deviceType, function(req, res, next)
{
	rioIndex.listRemoteIoDevices(function (listQueryErr, listQueryRes)
	{
		if (listQueryErr !== null)
		{
			res.status(400).send(listQueryErr.message);
		}
		else
		{
			res.send(listQueryRes);
		}
	});
});

router.post(deviceApiUrls.deviceType, function(req, res, next)
{
	var addResult = {};
	
	rioIndex.addRemoteIoDevice(req.body, function (addNewErr, addNewID)
	{
		if (addNewErr !== null)
		{
			res.status(400).send(addNewErr.message);
		}
		else
		{
			addResult = {success: true, id: addNewID};
			res.send(addResult);
		}
	});
});


router.get(deviceApiUrls.deviceQuery, function(req, res, next)
{
	// Todo
	res.send("Read Device");
});

router.put(deviceApiUrls.deviceQuery, function(req, res, next)
{
	// Todo
	res.send("Modify Device");
});


router.delete(deviceApiUrls.deviceQuery, function(req, res, next)
{
	// Todo
	res.send("Delete Device");
});



module.exports = router;