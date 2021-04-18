var express = require('express');
var deviceParams = require("../fox-api/device-params");
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
	var prepDeviceType = deviceParams.readPage(req.params.deviceType);
	var prepDeviceID = deviceParams.readPage(req.params.deviceId);
	var retrievedStatus = {};
	
	if (prepDeviceType !== null && prepDeviceID !== null)
	{
		retrievedStatus = rioIndex.getRioDeviceStatus(prepDeviceID);
		res.send(retrievedStatus);
	}
	else
	{
		res.status(404).send("Page Does Not Exist");
	}
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
	var prepDeviceID = deviceParams.readPage(req.params.deviceId);
	
	deviceParams.retrieveDevice(prepDeviceID, function(retrievedData)
	{
		if (retrievedData.outcome > 0)
		{
			res.send(retrievedData.deviceInfo);
		}
		else if (retrievedData.outcome === 0)
		{
			res.status(400).send(retrievedData.messageText);
		}
		else
		{
			res.status(404).send(retrievedData.messageText);
		}
	});
});

router.put(deviceApiUrls.deviceQuery, function(req, res, next)
{
	var updateResultObject = {};
	
	rioIndex.modRemoteIoDevice(req.body, function (updateExistingErr, updatedID)
	{
		if (updateExistingErr !== null)
		{
			res.status(400).send(updateExistingErr.message);
		}
		else
		{
			updateResultObject["success"] = true;
			updateResultObject["id"] = updatedID;
			res.send(updateResultObject);
		}
	});
});


router.delete(deviceApiUrls.deviceQuery, function(req, res, next)
{
	var deleteProp = req.headers["delete-permanently"];
	var delStatus = (deleteProp === "true");
	var deleteResultObject = {};
	
	rioIndex.delRemoteIoDevice(req.params.deviceId, delStatus, function (deleteExistingErr)
	{
		if (deleteExistingErr !== null)
		{
			res.status(400).send(deleteExistingErr.message);
		}
		else
		{
			deleteResultObject["success"] = true;
			res.send(deleteResultObject);
		}
	});
});



module.exports = router;