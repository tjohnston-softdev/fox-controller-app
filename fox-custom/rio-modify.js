const deviceModelClass = require("../fox-devices/_classes/device-model.class");
const deviceSettings = require("../fox-devices/device.settings");
const rioFactories = require('../fox-devices/remote_io/remote-io.factories');



function addNewDeviceEntry(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback)
{
	var newStoredDevice = null;
	
	checkInputType(inpDeviceObj, addNewCallback);
	inpDeviceObj.id = "Example";
	setMaker(inpDeviceObj);
	newStoredDevice = createStoredDevice(inpDeviceObj);
	checkCreationSuccessful(newStoredDevice, addNewCallback);
	
	rioDatabase.createDeviceEntity(newStoredDevice.object, function (addDeviceErr, addDeviceRes)
	{
		if (addDeviceErr !== null)
		{
			return addNewCallback(addDeviceErr, null);
		}
		else if (newStoredDevice.isEnabled === true)
		{
			enableDevice(addDeviceRes, rioDatabase, runDeviceList, addNewCallback);
		}
		else
		{
			return addNewCallback(null, addDeviceRes);
		}
	});
}



function updateExistingDeviceEntry(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback)
{
	var modifiedStoredDevice = null;
	var localID = null;
	
	checkInputType(inpDeviceObj, addNewCallback);
	checkMissingID(inpDeviceObj, addNewCallback);
	localID = inpDeviceObject.id;
	
	return updateExistingCallback(null, true);
}


function enableDevice(deviceID, rioDB, deviceList, enableCallback)
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
			handleDeviceListUpdate(deviceID, selectRes, deviceList);
			return enableCallback(null, deviceID);
		}
	});
}


function handleDeviceListUpdate(elementKey, moduleObj, listObj)
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


function checkInputType(inpValue, errorCallback)
{
	var givenType = typeof inpValue;
	var correctType = false;
	var flaggedMessage = "";
	
	if (inpValue !== undefined && inpValue !== null && givenType === "object")
	{
		correctType = true;
	}
	else
	{
		flaggedMessage = "Must be an object: " + inpValue;
		return errorCallback(new Error(flaggedMessage), null);
	}
}


function checkMissingID(inpObject, errorCallback)
{
	if (typeof inpObject.id !== "string")
	{
		return errorCallback(new Error("ID property missing!"), null);
	}
}


function setMaker(inpObject)
{
	if (typeof inpObject.maker !== "string")
	{
		inpObject.maker = deviceSettings.getDeviceMakerByModel(inpObject.model);
	}
}


function createStoredDevice(deviceData)
{
	var createRes = {object: null, errorMessage: ""};
	
	try
	{
		createRes.object = new deviceModelClass.StoredDevice(deviceData);
	}
	catch(e)
	{
		createRes.errorMessage = e.message;
	}
	
	return createRes;
}


function checkCreationSuccessful(sdCreate, errorCallback)
{
	var createSuccessful = false;
	
	if (sdCreate.object !== null)
	{
		createSuccessful = true;
	}
	else
	{
		return errorCallback(new Error(sdCreate.errorMessage), null);
	}
}



module.exports =
{
	addNewDevice: addNewDeviceEntry,
	updateExistingDevice: updateExistingDeviceEntry
};