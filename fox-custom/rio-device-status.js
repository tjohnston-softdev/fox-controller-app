// Functions used to enable or disable Remote IO devices.

const rioFactories = require('../fox-devices/remote_io/remote-io.factories');


// Main Function - Enable.
function enableDeviceEntry(deviceID, rioDB, deviceList, enableCallback)
{
	var preparedModule = null;
	
	// Checks if device exists in Remote IO database.
	rioDB.readDeviceEntity(deviceID, function (selectErr, selectRes)
	{
		if (selectErr !== null)
		{
			// Query error.
			return enableCallback(selectErr, null);
		}
		else
		{
			// Insert into 'running' array.
			insertListEntry(deviceID, selectRes, deviceList);
			return enableCallback(null, deviceID);
		}
	});
}


// Main Function - Disable.
function disableDeviceEntry(deviceID, deviceList)
{
	// If property exists, delete it.
	if (deviceList[deviceID] !== undefined)
	{
		delete deviceList[deviceID];
	}
}


// Adds item into 'running devices' array.
function insertListEntry(elementKey, moduleObj, listObj)
{
	var existValue = null;
	var existType = "";
	var prepModule = null;
	var prepType = "";
	var canAdd = true;
	var prepValid = false;
	
	
	// Check if element exists.
	existValue = listObj[elementKey];
	existType = typeof existingValue;
	
	
	if (existValue !== undefined && existValue !== null && existType === "object")
	{
		// Already exists.
		canAdd = false;
	}
	else
	{
		// Validate input object.
		prepModule = rioFactories.RemoteIoModule(moduleObj);
		prepType = typeof prepModule;
		prepValid = (prepModule !== undefined && prepModule !== null && prepType === "object");
	}
	
	
	
	if (canAdd === true && prepValid === true)
	{
		// Add to array.
		listObj[elementKey] = prepModule;
	}
}



module.exports =
{
	enableDevice: enableDeviceEntry,
	disableDevice: disableDeviceEntry
};