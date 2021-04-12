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
		else if (newStoredDevice.object.isEnabled === true)
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
	var localID = null;
	var modifiedStoredDevice = null;
	
	checkInputType(updatedDeviceObj, updateExistingCallback);
	checkMissingID(updatedDeviceObj, updateExistingCallback);
	localID = updatedDeviceObj.id;
	
	rioDatabase.readDeviceEntity(localID, function (existDeviceErr, existDeviceRes)
	{
		if (existDeviceErr !== null)
		{
			return updateExistingCallback(existDeviceErr, null);
		}
		else
		{
			modifiedStoredDevice = createStoredDevice(existDeviceRes);
			checkCreationSuccessful(modifiedStoredDevice, updateExistingCallback);
			saveDeviceChanges(localID, modifiedStoredDevice.object, rioDatabase, runDeviceList, updateExistingCallback);
		}
	});
}


function deleteDeviceEntry(inpDeleteID, inpPerm, rioDatabase, runDeviceList, dropCallback)
{
	disableDevice(inpDeleteID, runDeviceList);
	
	rioDatabase.deleteDeviceEntity(inpDeleteID, inpPerm, function (deleteDeviceErr)
	{
		if (deleteDeviceErr !== null)
		{
			return dropCallback(deleteDeviceErr, null);
		}
		else
		{
			return dropCallback(null, true);
		}
	});
}


function saveDeviceChanges(newIdString, newDataObject, rioDbase, rDeviceList, saveCallback)
{
	rioDbase.updateDeviceEntity(newIdString, newDataObject, function (saveChangeErr, saveChangeRes)
	{
		if (saveChangeErr !== null)
		{
			return saveCallback(saveChangeErr, null);
		}
		else if (newDataObject.isEnabled === true)
		{
			disableDevice(newIdString, rDeviceList);
			enableDevice(newIdString, rioDbase, rDeviceList, saveCallback);
		}
		else
		{
			disableDevice(newIdString, rDeviceList);
			return saveCallback(null, newIdString);
		}
	});
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


function disableDevice(deviceID, deviceList)
{
	if (deviceList[deviceID] !== undefined)
	{
		delete deviceList[deviceID];
	}
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
	updateExistingDevice: updateExistingDeviceEntry,
	deleteDevice: deleteDeviceEntry
};