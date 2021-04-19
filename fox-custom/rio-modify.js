const series = require("run-series");
const deviceModelClass = require("../fox-devices/_classes/device-model.class");
const deviceSettings = require("../fox-devices/device.settings");
const rioFactories = require('../fox-devices/remote_io/remote-io.factories');



function addNewDeviceEntry(inpDeviceObj, rioDatabase, runDeviceList, addNewCallback)
{
	var newStoredDevice = {contents: null};
	
	series(
	{
		"inputTypeValid": checkInputType.bind(null, inpDeviceObj),
		"newStoredDevice": createStoredDevice.bind(null, inpDeviceObj),
		"insertResult": insertNewDeviceObject.bind(null, inpDeviceObj, newStoredDevice, rioDatabase)
	},
	function (addDeviceErr, addDeviceRes)
	{
		if (addDeviceErr !== null)
		{
			return addNewCallback(addDeviceErr, null);
		}
		else if (addDeviceRes.newStoredDevice.isEnabled === true)
		{
			enableDevice(addDeviceRes.insertResult, rioDatabase, runDeviceList, addNewCallback);
		}
		else
		{
			return addNewCallback(null, addDeviceRes.insertResult);
		}
	});
}



function updateExistingDeviceEntry(updatedDeviceObj, rioDatabase, runDeviceList, updateExistingCallback)
{
	var modifiedStoredDevice = {contents: null};
	
	series(
	[
		checkInputType.bind(null, updatedDeviceObj),
		checkMissingID.bind(null, updatedDeviceObj),
		rioDatabase.readDeviceEntity.bind(null, updatedDeviceObj.id),
		createStoredDevice.bind(null, updatedDeviceObj, modifiedStoredDevice),
	],
	function (existDeviceErr, existDeviceRes)
	{
		if (existDeviceErr !== null)
		{
			return updateExistingCallback(existDeviceErr, null)
		}
		else
		{
			saveDeviceChanges(updatedDeviceObj.id, modifiedStoredDevice.contents, rioDatabase, runDeviceList, updateExistingCallback);
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



function insertNewDeviceObject(origInput, prepInput, rioDbase, insertNewCallback)
{
	setMaker(origInput);
	
	rioDbase.createDeviceEntity(prepInput.contents, function (insertEntryErr, insertEntryRes)
	{
		return insertNewCallback(insertEntryErr, insertEntryRes);
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


function checkInputType(inpValue, typeCallback)
{
	var givenType = typeof inpValue;
	var flaggedMessage = "";
	
	if (inpValue !== undefined && inpValue !== null && givenType === "object")
	{
		return typeCallback(null, true);
	}
	else
	{
		flaggedMessage = "Must be an object: " + inpValue;
		return typeCallback(new Error(flaggedMessage), null);
	}
}


function checkMissingID(inpObject, missingCallback)
{
	var idType = typeof inpObject.id;
	
	if (idType === "string")
	{
		return missingCallback(null, inpObject.id);
	}
	else
	{
		return missingCallback(new Error("ID property missing!"), null);
	}
}


function setMaker(inpObject)
{
	if (typeof inpObject.maker !== "string")
	{
		inpObject.maker = deviceSettings.getDeviceMakerByModel(inpObject.model);
	}
}


function createStoredDevice(deviceData, sdCreateCallback)
{	
	var createErr = null;
	var createRes = null;
	
	try
	{
		createRes = new deviceModelClass.StoredDevice(deviceData);
	}
	catch(thrownErr)
	{
		createErr = thrownErr;
	}
	finally
	{
		return sdCreateCallback(createErr, createRes);
	}
}



module.exports =
{
	addNewDevice: addNewDeviceEntry,
	updateExistingDevice: updateExistingDeviceEntry,
	deleteDevice: deleteDeviceEntry
};