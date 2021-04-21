const rioFactories = require('../fox-devices/remote_io/remote-io.factories');


function enableDeviceEntry(deviceID, rioDB, deviceList, enableCallback)
{
	var preparedModule = null;
	
	rioDB.readDeviceEntity(deviceID, function (selectErr, selectRes)
	{
		if (selectErr !== null)
		{
			return enableCallback(selectErr, null);
		}
		else
		{
			insertListEntry(deviceID, selectRes, deviceList);
			return enableCallback(null, deviceID);
		}
	});
}


function disableDeviceEntry(deviceID, deviceList)
{
	if (deviceList[deviceID] !== undefined)
	{
		delete deviceList[deviceID];
	}
}


function insertListEntry(elementKey, moduleObj, listObj)
{
	var existValue = listObj[elementKey];
	var existType = typeof existingValue;
	
	var prepModule = null;
	var prepType = "";
	
	var canAdd = true;
	var prepValid = false;
	
	if (existValue !== undefined && existValue !== null && existType === "object")
	{
		canAdd = false;
	}
	else
	{
		prepModule = rioFactories.RemoteIoModule(moduleObj);
		prepType = typeof prepModule;
		prepValid = (prepModule !== undefined && prepModule !== null && prepType === "object");
	}
	
	
	if (canAdd === true && prepValid === true)
	{
		listObj[elementKey] = prepModule;
	}
}



module.exports =
{
	enableDevice: enableDeviceEntry,
	disableDevice: disableDeviceEntry
};