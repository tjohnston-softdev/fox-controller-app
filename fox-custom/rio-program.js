// Secondary functions for Remote IO Index program tasks.


// Check device running.
function checkRioDeviceRunning(inpDeviceID, runDeviceList)
{
	var deviceObject = runDeviceList[inpDeviceID];
	var elementType = typeof deviceObject;
	var checkRes = (deviceObject !== undefined && deviceObject !== null && elementType === "object");
	
	return checkRes;
}


// Get devices by manufacturer.
function filterDeviceObjectsByManufacturer(tgtManufacturer, deviceList)
{
	var deviceIndex = 0;
	var currentDevice = {};
	var currentManufacturer = "";
	var currentType = "";
	var currentSet = false;
	var currentPrepared = "";
	var currentFilter = {};
	var currentPass = false;
	
	var filterRes = [];
	
	// Device object loop.
	for (deviceIndex = 0; deviceIndex < deviceList.length; deviceIndex = deviceIndex + 1)
	{
		// Read current device manufacturer.
		currentDevice = deviceList[deviceIndex];
		currentManufacturer = currentDevice.maker;
		currentType = typeof currentManufacturer;
		
		currentSet = false;
		currentPrepared = "";
		currentFilter = {};
		currentPass = false;
		
		
		if (currentType === "string" && currentManufacturer.length > 0)
		{
			// Manufacturer string read - Prepare text.
			currentSet = true;
			currentPrepared = currentManufacturer.toLowerCase();
			currentPrepared = currentPrepared.trim();
		}
		
		if (currentSet === true && currentPrepared !== tgtManufacturer)
		{
			// Ignore current object.
			currentPass = false;
		}
		else
		{
			// Filter current object.
			currentFilter = saveFilteredDevice(currentDevice);
			filterRes.push(currentFilter);
			currentPass = true;
		}
	}
	
	
	return filterRes;
}


// Unknown Module error.
function getUnknownModuleErrorText()
{
	var writeRes = "Module doesn't exist! (disabled or deleted)";
	return writeRes;
}



// Filtered device object.
function saveFilteredDevice(deviceObj)
{
	var saveRes = {};
	
	saveRes["value"] = deviceObj.id;
	saveRes["text"] = [deviceObj.name, " - ", deviceObj.ipAddress].join("");
	saveRes["name"] = deviceObj.name;
	
	return saveRes;
}



module.exports =
{
	checkDeviceRunning: checkRioDeviceRunning,
	filterDevicesByManufacturer: filterDeviceObjectsByManufacturer,
	getUnknownModuleError: getUnknownModuleErrorText
};