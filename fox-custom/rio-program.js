function checkRioDeviceRunning(inpDeviceID, runDeviceList)
{
	var deviceObject = runDeviceList[inpDeviceID];
	var elementType = typeof deviceObject;
	var checkRes = false;
	
	if (deviceObject !== undefined && deviceObject !== null && elementType === "object")
	{
		checkRes = true;
	}
	
	return checkRes;
}



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
	
	for (deviceIndex = 0; deviceIndex < deviceList.length; deviceIndex = deviceIndex + 1)
	{
		currentDevice = deviceList[deviceIndex];
		currentManufacturer = currentDevice.maker;
		currentType = typeof currentManufacturer;
		currentSet = false;
		currentPrepared = "";
		currentFilter = {};
		currentPass = false;
		
		if (currentType === "string" && currentManufacturer.length > 0)
		{
			currentSet = true;
			currentPrepared = currentManufacturer.toLowerCase();
			currentPrepared = currentPrepared.trim();
		}
		
		if (currentSet === true && currentPrepared !== tgtManufacturer)
		{
			currentPass = false;
		}
		else
		{
			currentFilter = saveFilteredDevice(currentDevice);
			filterRes.push(currentFilter);
			currentPass = true;
		}
	}
	
	
	return filterRes;
}



function saveFilteredDevice(deviceObj)
{
	var saveRes = {};
	
	saveRes["value"] = deviceObj.id;
	saveRes["text"] = deviceObj.name + " - " + deviceObj.ipAddress;
	saveRes["name"] = deviceObj.name;
	
	return saveRes;
}



module.exports =
{
	checkDeviceRunning: checkRioDeviceRunning,
	filterDevicesByManufacturer: filterDeviceObjectsByManufacturer
};