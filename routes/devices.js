var express = require('express');
var bodyParser = require("body-parser");
var httpErrors = require("http-errors");
var deviceParams = require("../fox-api/device-params");
var deviceSettings = require("../fox-devices/device.settings");
var rioIndex = require('../fox-devices/remote_io/remote-io.index');
var deviceApiUrls = require("../fox-api/device-paths");
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));


router.get('/', function(req, res, next)
{
	res.send("Devices root");
});


router.get(deviceApiUrls.deviceStatus, function(req, res, next)
{
	var prepDeviceType = deviceParams.readPage(req.params.deviceType);
	var prepDeviceID = deviceParams.readPage(req.params.deviceId);
	var retrievedStatus = {};
	var errorObject = null;
	
	if (prepDeviceType !== null && prepDeviceID !== null)
	{
		retrievedStatus = rioIndex.getRioDeviceStatus(prepDeviceID);
		res.send(retrievedStatus);
	}
	else
	{
		errorObject = httpErrors(404);
		return next(errorObject);
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
			res.send(listQueryErr);
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
	var errorObject = null;
	
	rioIndex.addRemoteIoDevice(req.body, function (addNewErr, addNewID)
	{
		if (addNewErr !== null)
		{
			errorObject = httpErrors(500, addNewErr.message);
			return next(errorObject);
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
	var errorObject = null;
	
	deviceParams.retrieveDevice(prepDeviceID, function(retrievedData)
	{
		if (retrievedData.outcome > 0)
		{
			res.send(retrievedData.deviceInfo);
		}
		else if (retrievedData.outcome === 0)
		{
			errorObject = httpErrors(retrievedData.messageText);
			return next(errorObject);
		}
		else
		{
			errorObject = httpErrors(404);
			return next(errorObject);
		}
	});
});

router.put(deviceApiUrls.deviceQuery, function(req, res, next)
{
	var updateResultObject = {};
	var errorObject = null;
	
	rioIndex.modRemoteIoDevice(req.body, function (updateExistingErr, updatedID)
	{
		if (updateExistingErr !== null)
		{
			errorObject = httpErrors(updateExistingErr);
			return next(errorObject);
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
	var deleteResultObject = {success: false, body: "", id: ""};
	var errorObject = null;
	
	rioIndex.delRemoteIoDevice(req.params.deviceId, delStatus, function (deleteExistingErr)
	{
		if (deleteExistingErr !== undefined && deleteExistingErr !== null)
		{
			deleteResultObject.success = true;
			deleteResultObject.body = deleteExistingErr.message;
			res.send(deleteResultObject);
		}
		else
		{
			deleteResultObject.success = true;
			res.send(deleteResultObject);
		}
	});
});



module.exports = router;