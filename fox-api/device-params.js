const rioIndex = require("../fox-devices/remote_io/remote-io.index");

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


function retrieveDeviceObject(inpDeviceID, deviceCallback)
{
	var apiResult = {};
	
	apiResult["outcome"] = -1;
	apiResult["deviceInfo"] = {};
	apiResult["messageText"] = "";
	
	if (inpDeviceID !== null)
	{
		callRemoteIoRead(inpDeviceID, apiResult, deviceCallback);
	}
	else
	{
		apiResult.outcome = -1;
		apiResult.messageText = "Device ID Not Entered";
		return deviceCallback(apiResult);
	}
}


function callRemoteIoRead(deviceID, resObject, rioCallback)
{
	rioIndex.getRemoteIoDevice(deviceID, function (rioErr, retrievedObject)
	{
		if (rioErr !== null)
		{
			resObject.outcome = 0;
			resObject.messageText = rioErr.message;
		}
		else
		{
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