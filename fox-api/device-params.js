// Help functions for Device and Node APIs.

const rioIndex = require("../fox-devices/remote_io/remote-io.index");


// Reads page string request parameter.
function readPagePart(parameterString)
{
	var givenType = typeof parameterString;
	var readRes = null;
	
	if (givenType === "string" && parameterString.length > 0)
	{
		readRes = parameterString;
	}
	
	return readRes;
}


// Retrieves Remote IO device information.
function retrieveDeviceObject(inpDeviceID, deviceCallback)
{
	var apiResult = {};
	
	// Result properties.
	apiResult["outcome"] = -1;
	apiResult["deviceInfo"] = {};
	apiResult["messageText"] = "";
	
	
	if (inpDeviceID !== null)
	{
		// Device entered - Query information.
		callRemoteIoRead(inpDeviceID, apiResult, deviceCallback);
	}
	else
	{
		// Not entered.
		apiResult.outcome = -1;
		apiResult.messageText = "Device ID Not Entered";
		return deviceCallback(apiResult);
	}
}


// Queries Remote IO Database.
function callRemoteIoRead(deviceID, resObject, rioCallback)
{
	rioIndex.getRemoteIoDevice(deviceID, function (rioErr, retrievedObject)
	{
		if (rioErr !== null)
		{
			// Query error.
			resObject.outcome = 0;
			resObject.messageText = rioErr.message;
		}
		else
		{
			// Successful.
			resObject.outcome = 1;
			resObject.deviceInfo = retrievedObject;
		}
		
		return rioCallback(resObject);
	});
}



module.exports =
{
	readPage: readPagePart,
	retrieveDevice: retrieveDeviceObject
};