// '/api/devices' router.

var express = require('express');
var bodyParser = require("body-parser");
var httpErrors = require("http-errors");
var deviceParams = require("../fox-api/device-params");
var deviceSettings = require("../fox-devices/device.settings");
var rioIndex = require('../fox-devices/remote_io/remote-io.index');
var deviceApiUrls = require("../fox-api/device-paths");
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));


// Root
router.get('/', function(req, res, next)
{
	res.send("Devices root");
});


// Get device status.
router.get(deviceApiUrls.deviceStatus, function(req, res, next)
{
	var prepDeviceType = deviceParams.readPage(req.params.deviceType);
	var prepDeviceID = deviceParams.readPage(req.params.deviceId);
	var retrievedStatus = {};
	var errorObject = null;
	
	if (prepDeviceType !== null && prepDeviceID !== null)
	{
		// Device parameters valid - Get status.
		retrievedStatus = rioIndex.getRioDeviceStatus(prepDeviceID);
		res.send(retrievedStatus);
	}
	else
	{
		// Device parameters error.
		errorObject = httpErrors(404);
		return next(errorObject);
	}
});


// Get defaults.
router.get(deviceApiUrls.defaults, function(req, res, next)
{
	var defaultRes = {};
	
	defaultRes["deviceTypes"] = deviceSettings.deviceTypes;
	defaultRes["rioMakers"] = deviceSettings.listRioMakers;
	defaultRes["rioModelTypes"] = deviceSettings.listRioModelTypes;
	
	res.send(defaultRes);
});



// Get Remote IO devices by type.
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


// Create new Remote IO device.
router.post(deviceApiUrls.deviceType, function(req, res, next)
{
	var addResult = {};
	var errorObject = null;
	
	rioIndex.addRemoteIoDevice(req.body, function (addNewErr, addNewID)
	{
		if (addNewErr !== null)
		{
			// Error
			errorObject = httpErrors(500, addNewErr.message);
			return next(errorObject);
		}
		else
		{
			// Successful.
			addResult = {success: true, id: addNewID};
			res.send(addResult);
		}
	});
});


// Get existing Remote IO device.
router.get(deviceApiUrls.deviceQuery, function(req, res, next)
{
	var prepDeviceID = deviceParams.readPage(req.params.deviceId);
	var errorObject = null;
	
	deviceParams.retrieveDevice(prepDeviceID, function(retrievedData)
	{
		if (retrievedData.outcome > 0)
		{
			// Successful.
			res.send(retrievedData.deviceInfo);
		}
		else if (retrievedData.outcome === 0)
		{
			// Query error.
			errorObject = httpErrors(retrievedData.messageText);
			return next(errorObject);
		}
		else
		{
			// Device ID not entered.
			errorObject = httpErrors(404);
			return next(errorObject);
		}
	});
});


// Update existing Remote IO device.
router.put(deviceApiUrls.deviceQuery, function(req, res, next)
{
	var updateResultObject = {};
	var errorObject = null;
	
	rioIndex.modRemoteIoDevice(req.body, function (updateExistingErr, updatedID)
	{
		if (updateExistingErr !== null)
		{
			// Error
			errorObject = httpErrors(updateExistingErr);
			return next(errorObject);
		}
		else
		{
			// Successful
			updateResultObject["success"] = true;
			updateResultObject["id"] = updatedID;
			res.send(updateResultObject);
		}
	});
});


// Delete existing Remote IO device.
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
			// Error
			deleteResultObject.success = true;
			deleteResultObject.body = deleteExistingErr.message;
			res.send(deleteResultObject);
		}
		else
		{
			// Successful
			deleteResultObject.success = true;
			res.send(deleteResultObject);
		}
	});
});



module.exports = router;